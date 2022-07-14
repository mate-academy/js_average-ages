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
  const men = (century
    ? people.filter(({ sex, died }) => sex === 'm'
    && Math.ceil(died / 100) === century)
    : people.filter(
      ({ sex }) => sex === 'm'));
  const age
    = men.reduce((sum, person) => sum + (person.died - person.born), 0)
      / men.length;

  return Math.round(age * 100) / 100;
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
  const women = (withChildren
    ? people.filter(
      ({ name }) => people.some(({ mother }) => mother === name))
    : people.filter(
      ({ sex }) => sex === 'f'));
  const age
   = women.reduce((sum, person) => sum + (person.died - person.born), 0)
    / women.length;

  return Math.round(age * 100) / 100;
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
  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm'
       && people.find(mom => person.mother === mom.name))
    : people.filter(person => people.find(mom => person.mother === mom.name));

  const age = children
    .reduce((prev, current) =>
      prev + current.born - people.find(person =>
        current.mother === person.name).born, 0
    ) / children.length;

  return Math.round(age * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
