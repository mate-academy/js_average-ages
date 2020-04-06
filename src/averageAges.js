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
  // replace `if ()` statement with logical operators (&&, ||)
  // or ternary operator (?:)
  // without nesting
  let filterPeople;

  century === undefined
    ? filterPeople = people.filter(el => el.sex === 'm')
    : filterPeople = people.filter(el => el.sex === 'm'
      && Math.trunc(el.died / 100) === century - 1);

  const res = filterPeople
    .reduce((sum, el) => sum + (el.died - el.born), 0);

  return res / filterPeople.length;
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
  // write code here
  let filterPeople;

  withChildren
    ? filterPeople = people
      .filter(el => people.some(item => item.mother === el.name))
    : filterPeople = people.filter(el => el.sex === 'f');

  const res = filterPeople
    .reduce((sum, el) => sum + (el.died - el.born), 0);

  return res / filterPeople.length;
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
  // write code here
  let filterChildren = people
    .filter(child => people.some(mom => mom.name === child.mother));

  onlyWithSon && (filterChildren = filterChildren
    .filter(el => el.sex === 'm'));

  const ageDifference = filterChildren
    .map(child => {
      const mom = people.find(el => el.name === child.mother);

      return child.born - mom.born;
    }).reduce((a, b) => a + b);

  return ageDifference / filterChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
