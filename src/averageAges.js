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
  const men = century
    ? people.filter(({ sex, died }) => sex === 'm'
      && Math.ceil(died / 100) === century)
    : people.filter(({ sex }) => sex === 'm');

  return men.reduce((acc, { died, born }) => acc + died - born, 0)
    / men.length;
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
  const women = withChildren
    ? people.filter(
      ({ name }) => people.some(({ mother }) => mother === name))
    : people.filter(({ sex }) => sex === 'f');

  return women.reduce((acc, { died, born }) => acc + died - born, 0)
    / women.length;
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
  const children = people.filter(({ mother }) =>
    people.some(({ name }) => mother === name));

  const filterdChildren = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  return filterdChildren.reduce((acc, current) =>
    acc + current.born - people.find(person =>
      person.name === current.mother).born, 0) / filterdChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
