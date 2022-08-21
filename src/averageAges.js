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
 *
 *
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
 *
 *
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

function calculateMenAverageAge(people, century) {
  const filteredMen = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return filteredMen.reduce(
    (accumulator, singleMan) =>
      accumulator + (singleMan.died - singleMan.born), 0) / filteredMen.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = withChildren
    ? people.filter(person => (
      people.find(child => child.mother === person.name)))
    : people.filter(person => person.sex === 'f');

  return filteredWomen.reduce((accumulator, singleWoman) => (
    accumulator
    + (singleWoman.died - singleWoman.born)), 0)
    / filteredWomen.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredChildren = onlyWithSon
    ? people.filter(child => (
      people.find(person => child.mother === person.name && child.sex === 'm')))
    : people.filter(child => (
      people.find(person => child.mother === person.name)));

  return filteredChildren.reduce((accumulator, child) => (
    accumulator
      + (child.born
- people.find(childMother => child.mother === childMother.name).born
      )), 0)
    / filteredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
