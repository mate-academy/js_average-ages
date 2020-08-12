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
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  return people
    .filter(person => (century
      ? Math.ceil(person.died / 100) === century : true)
      && person.sex === 'm')
    .map(person => person.died - person.born)
    .reduce((result, element, index) =>
      (result * index + element) / (index + 1));
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
  return people
    .filter(person => person.sex === 'f'
    && (withChildren ? people.some(child =>
      child.mother === person.name) : true))
    .map(person => person.died - person.born)
    .reduce((result, element, index) =>
      (result * index + element) / (index + 1));
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
  return people
    .filter(person => people.some(child =>
      child.name === person.mother)
    && (onlyWithSon ? person.sex === 'm' : true))
    .map(person =>
      person.born - people.find(child =>
        child.name === person.mother).born)
    .reduce((result, element, index) =>
      (result * index + element) / (index + 1));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
