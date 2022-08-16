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
  const filterMen = !century
    ? people.filter((person) => person.sex === 'm')
    : people.filter((person) => {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    });

  return filterMen.reduce((sum, person) => (
    sum + (person.died - person.born)), 0) / filterMen.length;
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
  const filterWomen = !withChildren
    ? people.filter((woman) => woman.sex === 'f')
    : people.filter(woman => (
      people.find(child => child.mother === woman.name)
    ) && woman.sex === 'f');

  return filterWomen.reduce((sum, woman) => (
    sum + (woman.died - woman.born)), 0) / filterWomen.length;
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
  const filterDifferents = !onlyWithSon
    ? people.filter(person => (
      people.find(mom => person.mother === mom.name)))
    : people.filter(person => (
      people.find(mom => person.mother === mom.name)
      && person.sex === 'm'));

  return filterDifferents.reduce((sum, per) => (
    sum + per.born - people.find(person => (
      per.mother === person.name)).born), 0) / filterDifferents.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
