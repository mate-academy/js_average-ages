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
  const men = people
    .filter(item =>
      item.sex === 'm'
      && (century === undefined
        || (item.died < century * 100 && item.died >= (century - 1) * 100)))
    .map(item => item.died - item.born);

  return men.reduce((sum, item) => sum + item, 0) / men.length;
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
  const women = people
    .filter(item =>
      item.sex === 'f'
      && (withChildren === undefined
        || people.find(child => child.mother === item.name) !== undefined))
    .map(item => item.died - item.born);

  return women.reduce((sum, item) => sum + item, 0) / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
    .filter(child => (onlyWithSon === undefined || child.sex === 'm')
      && people.find(parent => parent.name === child.mother) !== undefined)
    .map(child =>
      child.born - people.find(mother => mother.name === child.mother).born);

  return children.reduce((sum, item) => sum + item, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
