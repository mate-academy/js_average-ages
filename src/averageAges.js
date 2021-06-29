'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  // let manList;
  const manList = !century
    ? getPersonsBySex(people, 'm')
    : getPersonsBySex(people, 'm')
      .filter(item => Math.ceil(item.died / 100) === century);

  const getAge = getAgesList(manList);

  return calclulationSumAndAverage(getAge);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenList = !withChildren
    ? getPersonsBySex(people, 'f')
    : getMother(people);

  const getAge = getAgesList(womenList);

  return calclulationSumAndAverage(getAge);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childsList = !onlyWithSon
    ? getChildsList(people)
    : getChildsList(people).filter(item => item.sex === 'm');

  const getMotherList = getMother(people);

  const motherAge
    = childsList.map(item => item.born
      - getMotherList.find(person => item.mother === person.name).born);

  return calclulationSumAndAverage(motherAge);
}

function calclulationSumAndAverage(ageList) {
  return ageList.reduce((a, b) => a + b) / ageList.length;
}

function getAgesList(list) {
  return list.map(item => item.died - item.born);
}

function getPersonsBySex(listOfPersons, sex) {
  return listOfPersons.filter(item => item.sex === `${sex}`);
}

function getMother(peoplelList) {
  return getPersonsBySex(peoplelList, 'f').filter(item => {
    if (peoplelList.some(peoples => item.name === peoples.mother)) {
      return item;
    }
  });
}

function getChildsList(peopleList) {
  return peopleList.filter(item => {
    if (peopleList.some(person => item.mother === person.name)) {
      return item;
    }
  });
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
