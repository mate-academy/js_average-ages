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
  const mens = [...people].filter(person => person.sex === 'm');
  const filteredMens = century
    ? mens.filter(person => Math.ceil(person.died / 100) === century)
    : mens;
  const sumAges = filteredMens.reduce(
    (sum, age) => sum + (age.died - age.born), 0);

  return sumAges / filteredMens.length;

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
  const womens = [...people].filter(person => person.sex === 'f');
  const filteredWomens = withChildren
    ? people.filter(
      person => people.some(child => child.mother === person.name)
      && person.sex === 'f')
    : womens;
  const sumAges = filteredWomens.reduce(
    (sum, age) => sum + (age.died - age.born), 0);

  return sumAges / filteredWomens.length;
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
  // const mothers = [...people].filter(
  //   person => people.some(child => child.mother === person.name));

  const children = [...people].filter(
    child => people.some(person => child.mother === person.name));

  const filteredChildren = onlyWithSon
    ? children.filter(person => person.sex === 'm')
    : children;

  const sumAges = filteredChildren.reduce((sum, child) => sum + (child.born
    - people.find(mom => child.mother === mom.name).born), 0);

  return sumAges / filteredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
