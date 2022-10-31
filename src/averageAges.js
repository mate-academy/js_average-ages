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
  const menList = century
    ? getGenderList(people, 'm').filter(men =>
      Math.ceil(men.died / 100) === century)
    : getGenderList(people, 'm');

  const menLifeLength = menList.map(person => person.died - person.born);

  return calculateAverageAge(menLifeLength);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const withChildrenList = people.map(person => person.mother);

  const womenList = withChildren
    ? getGenderList(people, 'f').filter(women =>
      withChildrenList.includes(women.name))
    : getGenderList(people, 'f');

  const womenLifeLength = womenList.map(person => person.died - person.born);

  return calculateAverageAge(womenLifeLength);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const isNeedChildren = onlyWithSon
    ? getGenderList(people, 'm').filter(person => people.find(mother =>
      person.mother === mother.name))
    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const differences = isNeedChildren.map(person =>
    person.born - people.find(mother =>
      person.mother === mother.name).born);

  return calculateAverageAge(differences);
}

function calculateAverageAge(listToReduce) {
  return listToReduce.reduce((sum, property) =>
    sum + property) / listToReduce.length;
}

function getGenderList(listOfPersons, gender) {
  return listOfPersons.filter(person => person.sex === gender);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
