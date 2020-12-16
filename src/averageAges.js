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
  const men = century
    ? people.filter(man => man.sex === 'm'
  && Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');

  const addAge = men.map(man => man.died - man.born);
  const averageAges = addAge.reduce((acc, curr) => acc + curr) / addAge.length;

  return +averageAges.toFixed(2);
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
  const women = withChildren
    ? people.filter(mom => people.some(child => mom.name === child.mother))
    : people.filter(woman => woman.sex === 'f');

  const addAge = women.map(woman => woman.died - woman.born);
  const averageAges = addAge.reduce((acc, curr) => acc + curr) / addAge.length;

  return +averageAges.toFixed(2);
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
  // write code here
  const children = onlyWithSon
    ? people.filter(child => people.some(mom => child.mother === mom.name)
    && child.sex === 'm')
    : people.filter(child => people.some(mom => child.mother === mom.name));

  const ages = children.map(child =>
    child.born - people.find(mom => mom.name === child.mother).born);

  const averageAgesDiff = ages.reduce((prev, curr) =>
    prev + curr) / ages.length;

  return +averageAgesDiff.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
