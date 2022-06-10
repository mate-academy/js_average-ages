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
  const men = people.filter(function(person) {
    return person.sex === 'm';
  });
  const mens = century ? men.filter(person =>
    Math.ceil(person.died / 100) === century) : men;

  const average = mens.reduce((sum, age) =>
    sum + (age.died - age.born), 0) / mens.length;

  return average;

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
  const massive = people.filter(person => person.sex === 'f');

  const names = people.filter(person => people.some(child =>
    child.mother === person.name) && person.sex === 'f');

  const women = withChildren ? names : massive;
  const average = women.reduce((sum, age) =>
    sum + (age.died - age.born), 0) / women.length;

  return average;

  // write code here
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
  const massive = people.filter(person => people.some(child =>
    person.mother === child.name));

  const children = onlyWithSon ? massive.filter(person =>
    person.sex === 'm') : massive;

  const average = children.reduce((sum, age) =>
    sum + (age.born - people.find(mama => age.mother === mama.name).born), 0)
  / children.length;

  return average;

  // write code here
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
