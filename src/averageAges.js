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
      (human) => human.sex === 'm' && Math.ceil(human.died / 100) === century
    )
    : people.filter((human) => human.sex === 'm');

  const ageSum = men.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue.died - currentValue.born;
  }, 0);

  return +(ageSum / men.length).toFixed(2);

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = withChildren
    ? people.filter(
      (woman) =>
        woman.sex === 'f'
          && people.some((human) => human.mother === woman.name)
    )
    : people.filter((woman) => woman.sex === 'f');

  const ageSum = women.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue.died - currentValue.born;
  }, 0);

  return +(ageSum / women.length).toFixed(2);
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
    ? people.filter(
      (human) =>
        human.sex === 'm' && people.some((mom) => mom.name === human.mother)
    )
    : people.filter((human) => people.some((mom) => mom.name === human.mother));

  const ageDiff = children
    .map(
      (child) =>
        child.born - people.find((mom) => child.mother === mom.name).born
    )
    .reduce(function(accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  return +(ageDiff / children.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
