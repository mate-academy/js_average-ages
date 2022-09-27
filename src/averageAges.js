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
  const men
    = arguments.length > 1
      ? people.filter(person => Math.ceil(person.died / 100) === century
        && person.sex === 'm')
      : people.filter(person => person.sex === 'm');

  return men.reduce(
    (prev, curr) => prev + (curr.died - curr.born), 0
  ) / men.length;

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

//  person.mother === withChildren
function calculateWomenAverageAge(people, withChildren) {
  const women
    = arguments.length > 1
      ? people.filter(
        person =>
          people.some(child => child.mother === person.name) === withChildren
          && person.sex === 'f')
      : people.filter(person => person.sex === 'f');

  return women.reduce(
    (prev, curr) => prev + (curr.died - curr.born), 0
  ) / women.length;
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
  let children = people.filter(child => child.mother
    && people.find(person => person.name === child.mother));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDifferenece = children
    .reduce((sum, personA) => sum + personA.born - people
      .find(personB => personB.name === personA.mother).born, 0);

  return ageDifferenece / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
