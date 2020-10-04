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
  return +people
    .filter(person => (century > 0)
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm')
    .map(person => person.died - person.born)
    .reduce((prev, value, i, array) => prev + value / array.length, 0)
    .toFixed(2);
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
  return +people
    .filter(person => withChildren
      ? people.some(child => child.mother === person.name)
      : person.sex === 'f')
    .map(person => person.died - person.born)
    .reduce((prev, value, i, arr) => prev + value / arr.length, 0)
    .toFixed(2);
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
  const arr = people
    .filter(child =>
      people.some(mother => onlyWithSon ? child.mother === mother.name
        && child.sex === 'm'
        : child.mother === mother.name));

  return +arr
    .map(person => person.born - people
      .find(pers => pers.name === person.mother).born)
    .reduce((prev, item, i, array) => prev + item / array.length, 0)
    .toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
