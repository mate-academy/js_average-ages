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
  const menList = (century)
    ? people.filter(person => (person.sex === 'm')
      && (century === Math.ceil(person.died / 100)))
    : people.filter(person => (person.sex === 'm'));

  const averageAge = menList.reduce((previousValue, currentValue) =>
    (previousValue + (currentValue.died - currentValue.born)), 0)
      / menList.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const womenList = (withChildren)
    ? people.filter(person => (person.sex === 'f')
      && (people.find(children => children.mother === person.name)))
    : people.filter(person => (person.sex === 'f'));

  const averageAge = womenList.reduce((previousValue, currentValue) =>
    (previousValue + (currentValue.died - currentValue.born)), 0)
      / womenList.length;

  return averageAge;
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
  const ageDiffArr = (onlyWithSon)
    ? people.filter(child => child.sex === 'm'
      && people.find(mother => mother.name === child.mother))
    : people.filter(child =>
      people.find(mother => mother.name === child.mother));

  const averageAge = ageDiffArr.reduce((previousValue, currentValue) =>
    (previousValue + (currentValue.born - people.find(mother =>
      mother.name === currentValue.mother).born)), 0)
    / ageDiffArr.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
