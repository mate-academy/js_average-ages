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
  const males = people.filter(person => century ? person.sex === 'm'
  && (Math.ceil(person.died / 100)) === century : person.sex === 'm');

  return males.reduce((sum, value) =>
    sum + (value.died - value.born), 0
  ) / males.length;
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
  const females = (withChildren
    ? people.filter(
      ({ name }) => people.some(({ mother }) => mother === name))
    : people.filter(
      ({ sex }) => sex === 'f'));

  return females.reduce((sum, value) =>
    sum + (value.died - value.born), 0
  ) / females.length;
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
  const withChildren = (onlyWithSon
    ? people.filter(person =>
      person.sex === 'm'
      && people.find(mom => person.mother === mom.name))
    : people.filter(person =>
      people.find(mom => person.mother === mom.name)));

  return withChildren.reduce((sum, person) =>
    sum + person.born - people.find(mom => person.mother === mom.name).born, 0)
  / withChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
