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

  let menAges;

  century
    ? menAges = people
      .filter(({ sex, died }) => sex === 'm'
        && Math.ceil(died / 100) === century)
    : menAges = people
      .filter(({ sex }) => sex === 'm');

  return menAges
    .map(({ born, died }) => died - born)
    .reduce((prev, next) => prev + next, 0) / menAges.length;
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
  const mothers = people
    .filter(person => people
      .find(({ mother }) => mother === person.name));

  const women = people
    .filter(({ sex }) => sex === 'f');

  const womenAges = withChildren ? mothers : women;

  return womenAges
    .map(({ born, died }) => died - born)
    .reduce((prev, next) => prev + next, 0) / womenAges.length;
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
  const mothers = people
    .filter(person => people
      .find(({ mother }) => mother === person.name));

  const children = people
    .filter(child => mothers
      .find(mother => onlyWithSon
        ? child.mother === mother.name && child.sex === 'm'
        : child.mother === mother.name
      ));

  return children
    .map(human => human.born - people
      .find(woman => woman.name === human.mother).born)
    .reduce((prev, next) => prev + next, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
