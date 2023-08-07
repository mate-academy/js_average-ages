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
    ? people.filter(
      ({ sex, died }) => sex === 'm' && Math.ceil(died / 100) === century)
    : people.filter(({ sex }) => sex === 'm');

  return men.reduce(
    (total, { born, died }) => total + (died - born), 0)
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
    ? people.filter(({ sex, name }) =>
      sex === 'f' && people.some(({ mother }) => name === mother))
    : people.filter(({ sex }) => sex === 'f');

  return women.reduce(
    (total, { born, died }) => total + (died - born), 0)
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
  const children = onlyWithSon
    ? people.filter(({ sex, mother }) =>
      (people.some(({ name }) => mother === name) && sex === 'm'))
    : people.filter(({ mother }) =>
      people.some(({ name }) => mother === name));

  return children.reduce(
    (total, { born, mother }) =>
      total + (born - people.find(({ name }) => name === mother).born), 0)
    / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
