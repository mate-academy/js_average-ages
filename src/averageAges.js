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
  const MenAverageAge = people.filter(({ died, sex }) => (
    !century
      ? sex === 'm'
      : sex === 'm' && Math.ceil(died / 100) === century));

  return MenAverageAge.reduce((sumOfAge, { born, died }) => (
    sumOfAge + died - born), 0) / MenAverageAge.length;
}

// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const WomenAverageAge = !withChildren
    ? people.filter(({ sex }) => sex === 'f')
    : people.filter(({ name }) => people.find(({ mother }) => name === mother));

  return WomenAverageAge.reduce((sumOfAge, { born, died }) => (
    sumOfAge + died - born), 0) / WomenAverageAge.length;
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
  const AverageAgeDiff = !onlyWithSon
    ? people.filter(({ mother }) => (
      people.find(({ name }) => mother === name)))
    : people.filter(({ mother, sex }) => (
      people.find(({ name }) => mother === name && sex === 'm')));

  return AverageAgeDiff.reduce((sumOfAge, { born, mother }) => (
    sumOfAge + born - people.find(({ name }) => (
      mother === name)).born), 0) / AverageAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
