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
  const mens = !century
    ? people.filter((user) => user.sex === 'm')
    : people.filter((user) =>
      user.sex === 'm' && Math.ceil(user.died / 100) === century);

  return mens.reduce((result, men) =>
    result + (men.died - men.born), 0) / mens.length;
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
  const womens = !withChildren
    ? people.filter((user) => user.sex === 'f')
    : people.filter((user) =>
      user.sex === 'f' && people.some((child) => user.name === child.mother));

  return womens.reduce((result, men) =>
    result + (men.died - men.born), 0) / womens.length;
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
  const children = !onlyWithSon
    ? people.filter(user => people.find(child => user.mother === child.name))
    : people.filter(user => people.find(child =>
      user.mother === child.name) && user.sex === 'm');

  return children.reduce((result, child) => {
    return result + child.born - people.find((mother) =>
      mother.name === child.mother).born;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
