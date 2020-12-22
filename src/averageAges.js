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
  const men = people.filter(person => person.sex === 'm');

  const menAge = (century)
    ? men
      .filter(person => Math.ceil(person.died / 100) === century)
      .map(person => person.died - person.born)
    : men.map(person => person.died - person.born);

  return menAge
    .reduce((sum, age) => sum + age) / menAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');

  const womenAge = (withChildren)
    ? women
      .filter(mother => people.some(child => child.mother === mother.name))
      .map(person => person.died - person.born)
    : women
      .map(person => person.died - person.born);

  return womenAge
    .reduce((sum, age) => sum + age) / womenAge.length;
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
  const children = people
    .filter(person => people
      .some(mother => mother.name === person.mother));

  const sons = people
    .filter(person => people
      .some(mother => mother.name === person.mother) && person.sex === 'm');

  const childrenCount = (onlyWithSon)
    ? sons
    : children;

  const ageDiff = childrenCount
    .map(person => person.born - people
      .find(mother => mother.name === person.mother).born);

  return ageDiff
    .reduce((sum, age) => sum + age) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
