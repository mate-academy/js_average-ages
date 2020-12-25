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
  let men = people.filter(({ sex }) => sex === 'm');

  if (century) {
    men = men.filter(({ died }) => Math.ceil(died / 100) === century);
  }

  return men
    .map(({ born, died }) => died - born)
    .reduce((a, b) => a + b) / men.length;
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
  let women = people.filter(({ sex }) => sex === 'f');

  if (withChildren) {
    women = women
      .filter(({ name }) => people
        .some(({ mother }) => mother === name));
  };

  return women
    .map(({ born, died }) => died - born)
    .reduce((a, b) => a + b) / women.length;
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
  const children = onlyWithSon
    ? people
      .filter(child => child.sex === 'm'
        && people
          .find(({ name }) => child.mother === name))
    : people
      .filter(child =>
        people
          .find(mother => child.mother === mother.name));

  return children.reduce((accum, child) => {
    return accum + child.born - people
      .find(mother => mother.name === child.mother).born;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
