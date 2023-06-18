'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter((person) => {
    if (century) {
      return Math.ceil(person.died / 100) === century && person.sex === 'm';
    } else {
      return person.sex === 'm';
    }
  });

  const sumAge = filteredMen.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  const averageAge = sumAge / filteredMen.length;

  return +averageAge.toFixed(2);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter(person => {
    if (withChildren) {
      return people.some(child => child.mother === person.name);
    } else {
      return person.sex === 'f';
    }
  });

  const sumAge = filteredWomen.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  const averageAge = sumAge / filteredWomen.length;

  return +averageAge.toFixed(2);
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
    ? people.filter(person => person.sex === 'm' && person.mother)
    : people.filter(person => person.mother
      && people.find(p => p.name === person.mother));

  const ageDifferences = filteredPeople.map(person => {
    const mother = people.find(p => p.name === person.mother);

    return mother ? person.born - mother.born : null;
  });

  const validAgeDifferences = ageDifferences
    .filter(ageDiff => ageDiff !== null);

  const sumAgeDiff = validAgeDifferences
    .reduce((acc, ageDiff) => acc + ageDiff, 0);
  const averageAgeDiff = validAgeDifferences.length > 0
    ? sumAgeDiff / validAgeDifferences.length
    : 0;

  return +averageAgeDiff.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
