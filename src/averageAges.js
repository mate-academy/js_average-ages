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
  const filteredByCentury = century
    ? people.filter(person => {
      return Math.ceil(person.died / 100) === century
        && person.sex === 'm';
    })
    : people.filter(person => person.sex === 'm');

  const averageAge = filteredByCentury
    .map(person => (person.died - person.born))
    .reduce((prev, person) => prev + person);

  return averageAge / filteredByCentury.length;
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
  const filteredByChild = withChildren
    ? people.filter(person => {
      return people.some(child => child.mother === person.name)
        && person.sex === 'f';
    })
    : people.filter(person => person.sex === 'f');

  const averageAge = filteredByChild
    .map(person => (person.died - person.born))
    .reduce((prev, person) => prev + person);

  return averageAge / filteredByChild.length;
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
  const mother = people.filter(person => person.mother
    && people.some(parent => parent.name === person.mother));

  const filteredBySon = onlyWithSon
    ? mother.filter(child => child.sex === 'm')
    : mother;

  const averageAge = filteredBySon
    .map(person => person.born - people
      .find(parent => parent.name === person.mother).born)
    .reduce((sum, ageDifference) => (sum + ageDifference), 0);

  return averageAge / filteredBySon.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
