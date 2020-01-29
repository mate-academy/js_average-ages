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
  // replace `if ()` statement with logical operators (&&, ||) or
  // ternary operator (?:) without nesting
  const apropriateMen = people.filter(item => {
    return century
      ? Math.ceil(item.died / 100) === century && item.sex === 'm'
      : item.sex === 'm';
  });

  const sumAge = apropriateMen.reduce(
    (previoseValue, item) => previoseValue + item.died - item.born,
    0
  );

  return sumAge / apropriateMen.length;
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
  const apropriateWomen = people.filter(item => {
    return withChildren
      ? item.sex === 'f' && people.some(item2 => item2.mother === item.name)
      : item.sex === 'f';
  });

  const sumAge = apropriateWomen.reduce(
    (previoseValue, item) => previoseValue + item.died - item.born,
    0);

  return sumAge / apropriateWomen.length;
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
  const apropriateChild = people.filter(item => {
    return onlyWithSon
      ? people.some(item2 => item2.name === item.mother) && item.sex === 'm'
      : people.some(item2 => item2.name === item.mother);
  });

  const sum = apropriateChild.reduce((initialValue, item) => {
    return initialValue
      + item.born
      - people.find(item2 => item2.name === item.mother).born;
  },
  0);

  return sum / apropriateChild.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
