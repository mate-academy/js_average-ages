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
  let men;

  century ? men = people.filter(x => x.sex === 'm')
    .filter(x => Math.ceil(x.died / 100) === century)
    : men = people.filter(x => x.sex === 'm');

  return men.map(x => (x.died - x.born))
    .reduce((sum, x) => sum + x) / men.length;

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
  let women;

  withChildren ? women = people.filter(x => x.sex === 'f'
    && people.find(a => a.mother === x.name))
    : women = people.filter(x => x.sex === 'f');

  return women.map(x => x.died - x.born)
    .reduce((sum, x) => sum + x) / women.length;
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
  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm'
    && people.some(woman => woman.name === person.mother)
    : people.some(woman => woman.name === person.mother));

  return children.map(child => child.born
    - people.find(woman => woman.name === child.mother).born)
    .reduce((sum, current) => sum + current, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
