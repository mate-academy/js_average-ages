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
  const men = people.filter(({ sex, died }) => !century
    ? sex === 'm'
    : sex === 'm' && Math.ceil(died / 100) === century
  );

  const ages = men.map(({ born, died }) => died - born);

  return ages.reduce((sum, lifeLength) => sum + lifeLength, 0) / ages.length;

  // write code here
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
  const women = people.filter(({ sex }) => sex === 'f');

  const ecssentialWomenAges = !withChildren
    ? women.map(({ born, died }) => died - born)
    : women.filter(({ name }) => (
      people.find(({ mother }) => mother === name)
    )).map(({ born, died }) => died - born);

  return ecssentialWomenAges.reduce((sum, lifeLength) => (
    sum + lifeLength
  ), 0) / ecssentialWomenAges.length;
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
  const esentialChildrens = people.filter(({ mother, sex }) => !onlyWithSon
    ? people.find(({ name }) => name === mother)
    : sex === 'm' && people.find(({ name }) => name === mother)
  );

  return esentialChildrens.reduce((sum, { born, mother }) => {
    const childMother = people.find(({ name }) => name === mother);

    return sum + (born - childMother.born);
  }, 0) / esentialChildrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
