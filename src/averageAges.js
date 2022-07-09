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
  const men = people.filter(person => (century)
    ? (person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : (person.sex === 'm'));
  const averageMenAge = men.reduce((sum, person) =>
    (sum + (person.died - person.born) / men.length), 0);

  return +averageMenAge.toFixed(2);
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
  const women = people.filter(person => (withChildren)
    ? (person.sex === 'f' && people.some(child => child.mother === person.name))
    : (person.sex === 'f'));
  const averageWomenAge = women.reduce((sum, person) =>
    (sum + (person.died - person.born) / women.length), 0);

  return +averageWomenAge.toFixed(2);
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
  const child = people.filter(person => (onlyWithSon)
    ? (people.some(mother => mother.name === person.mother)
    && person.sex === 'm')
    : people.some(mother => mother.name === person.mother));

  const averageAgeDiff = child.map(person =>
    (person.born - people.find(mother => mother.name === person.mother).born));

  return averageAgeDiff.reduce((sum, curr) =>
    sum + curr) / averageAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
