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
  let onlyMale = people.filter(person => person.sex === 'm');

  onlyMale = century
    ? onlyMale.filter(person => Math.ceil(person.died / 100) === century)
    : onlyMale;

  return onlyMale.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / onlyMale.length;
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
  let onlyFemale = people.filter(person => person.sex === 'f');

  onlyFemale = withChildren
    ? onlyFemale.filter(women => people.some(person =>
      women.name === person.mother))
    : onlyFemale;

  return onlyFemale.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / onlyFemale.length;
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
  let onlyChild = people.filter(child => child.mother
    && people.find(person => person.name === child.mother));

  onlyChild = onlyWithSon
    ? onlyChild.filter(child => child.sex === 'm')
    : onlyChild;

  return onlyChild.reduce((sum, child) =>
    sum + child.born - (people.find(person =>
      person.name === child.mother).born), 0) / onlyChild.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
