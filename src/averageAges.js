'use strict';

// const { map } = require('./people');

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
  const men = people
    .filter(({ sex, died }) => century
      ? sex === 'm'
        && Math.ceil(died / 100) === century
      : sex === 'm');

  const menAverageAge = men
    .reduce((sum, { died, born }) => sum + (died - born), 0) / men.length;

  return menAverageAge;
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
  const women = people
    .filter(({ name, sex }) => withChildren
      ? people
        .some(({ mother }) => mother === name)
      : sex === 'f');

  const womenAverageAge = women
    .reduce((sum, { died, born }) => sum + (died - born), 0) / women.length;

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
  const children = people
    .filter(({ mother, sex }) => onlyWithSon
      ? sex === 'm'
        && people
          .find(({ name }) => name === mother)
      : people
        .find(({ name }) => name === mother));

  const averageAgeDiff = children
    .reduce((sum, { born: childBirth, mother }) => sum + (childBirth - people
      .find(({ name }) => name === mother).born), 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
