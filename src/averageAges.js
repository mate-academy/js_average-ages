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
  const mens = people.filter(person => century
    ? person.sex === 'm'
    && Math.ceil(person.died / 100) === century : person.sex === 'm');
  const sumOfYears = mens.map(person => person.died - person.born)
    .reduce((sum, x) => sum + x, 0);

  return sumOfYears / mens.length;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const womens = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    && person.sex === 'f' : person.sex === 'f');

  const sumOfYears = womens.map(person => person.died - person.born)
    .reduce((sum, x) => sum + x, 0);

  return sumOfYears / womens.length;
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
  const women = people.filter(person => person.sex === 'f'
  && people.some(child => child.mother === person.name));
  const children = people.filter(person => onlyWithSon
    ? people.some(parent => person.mother === parent.name)
    && person.sex === 'm'
    : people.some(parent => person.mother === parent.name));

  const ages = children.map(child => child.born
    - women.find(girl => girl.name === child.mother).born);

  return ages.reduce((sum, x) => sum + x, 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
