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
function calculateMenAverageAge(people, century = null) {
  let men = people.filter(person => person.sex === 'm');

  if (century !== null) {
    men = men.filter(person => Math.ceil(person.died / 100) === century);
  }

  const totalAge = men.reduce(
    (sum, person) => sum + (person.died - person.born), 0);

  const averageAge = totalAge / men.length;

  return averageAge;
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
function calculateWomenAverageAge(people, withChildren = null) {
  let women = people.filter(person => person.sex === 'f');

  if (withChildren !== null) {
    women = people
      .filter(person => people.some(child => child.mother === person.name));
  }

  const totalAge = women.reduce(
    (sum, person) => sum + (person.died - person.born), 0);

  const averageAge = totalAge / women.length;

  return averageAge;
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm' && person.mother !== null)
    : people.filter(person => person.mother !== null);

  const ageDifference = filteredPeople.map(person => {
    const mother = people.find(p => p.name === person.mother);

    if (mother && mother.born) {
      return person.born - mother.born;
    }

    return null;
  });

  const validAgeDifference = ageDifference.filter(ageDiff => ageDiff !== null);
  const totalAgeDifference = validAgeDifference.reduce(
    (sum, ageDiff) => sum + ageDiff, 0);
  const averageAgeDiff = totalAgeDifference / validAgeDifference.length || 0;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
