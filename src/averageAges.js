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
  const filteredMen = people.filter(item => {
    return century
      ? Math.ceil(item.died / 100) === century && item.sex === 'm'
      : item.sex === 'm';
  });

  const sumAge = filteredMen.reduce(
    (previoseValue, item) => previoseValue + item.died - item.born,
    0
  );

  return sumAge / filteredMen.length;
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
  const filteredWomen = people.filter(item => {
    return withChildren
      ? item.sex === 'f' && people.some(child => child.mother === item.name)
      : item.sex === 'f';
  });

  const sumAge = filteredWomen.reduce(
    (previoseValue, item) => previoseValue + item.died - item.born,
    0);

  return sumAge / filteredWomen.length;
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
  const filteredChild = people.filter(item => {
    return onlyWithSon
      ? people.some(moter => moter.name === item.mother) && item.sex === 'm'
      : people.some(moter => moter.name === item.mother);
  });

  const sum = filteredChild.reduce((initialValue, item) => {
    return initialValue + item.born - people
      .find(moter => moter.name === item.mother).born;
  },
  0);

  return sum / filteredChild.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
