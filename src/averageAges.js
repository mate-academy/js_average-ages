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
  const men = century !== undefined
    ? people.filter(p => p.sex === 'm' && Math.ceil(p.died / 100) === century)
    : people.filter(p => p.sex === 'm');

  return men.reduce((sum, p) => sum + p.died - p.born, 0) / men.length;
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
  const women = withChildren !== undefined
    ? people.filter(({ name, sex }) => sex === 'f'
        && people.some(({ mother }) => mother === name))
    : people.filter(({ sex }) => sex === 'f');

  return women.reduce((sum, p) => sum + p.died - p.born, 0) / women.length;
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
  const withMothers = onlyWithSon !== undefined
    ? people.filter(({ sex, mother }) => sex === 'm'
      && people.some(({ name }) => mother === name))

    : people.filter(
      ({ mother }) => people.some(({ name }) => mother === name));

  return withMothers.reduce((sum, p) => {
    const mother = people.find(({ name }) => p.mother === name);

    return sum + p.born - mother.born;
  }, 0) / withMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
