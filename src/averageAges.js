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
      .filter(({ sex }) => sex === 'm')
      .filter(({ died }) => Math.ceil(died / 100) === century)
      .map(({ born, died }) => died - born)
    : menAges = people
      .filter(({ sex }) => sex === 'm')
      .map(({ born, died }) => died - born);

  const menAverage = menAges
    .reduce((prev, next) => prev + next, 0) / menAges.length;

  return menAverage;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
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

  const womenAverage = womenAges
    .map(({ born, died }) => died - born)
    .reduce((prev, next) => prev + next, 0) / womenAges.length;

  return womenAverage;
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
