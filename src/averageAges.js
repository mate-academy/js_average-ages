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
  let menList = people.filter(person => person.sex === 'm');

  menList = century
    ? menList.filter(man => Math.ceil(man.died / 100) === century)
    : menList;

  const menAverageAge = getAverageAge(menList);

  return menAverageAge;
}

function getAverageAge(peopleList) {
  return peopleList.reduce((ageSum, person) =>
    ageSum + (person.died - person.born), 0) / peopleList.length;
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
  const womenList = withChildren
    ? people.filter(woman => people.some(person =>
      person.mother === woman.name))
    : people.filter(person => person.sex === 'f');

  const womenAverageAge = getAverageAge(womenList);

  return womenAverageAge;
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
  const childrenList = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.some(woman => woman.name === person.mother))
    : people.filter(person => people.some(woman =>
      woman.name === person.mother));

  const averageAgeDiffList = childrenList.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  return averageAgeDiffList.reduce((ageDiffSum, difference) =>
    ageDiffSum + difference) / averageAgeDiffList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
