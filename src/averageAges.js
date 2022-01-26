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
  const mans = (century)
    ? people.filter(person => person.sex === 'm'
      && century === Math.ceil(person.died / 100))
    : people.filter(person => person.sex === 'm');
  const sumAges = mans
    .map(person => person.died - person.born)
    .reduce((prev, curr) => prev + curr);

  return sumAges / mans.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const womans = (withChildren)
    ? people.filter(person => person.sex === 'f'
    && people.find(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');
  const sumAges = womans
    .map(person => person.died - person.born)
    .reduce((prev, curr) => prev + curr);

  return sumAges / womans.length;
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

  const children = people.filter(person => (onlyWithSon)
    ? people.some(mother => mother.name === person.mother)
      && person.sex === 'm'
    : people.some(mother => mother.name === person.mother));

  const diff = children
    .map(kid => kid.born - people
      .find(mother => mother.name === kid.mother).born);

  return diff.reduce((prev, curr) => prev + curr) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
