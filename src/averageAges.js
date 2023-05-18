'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const mensAges = people
    .filter(person => {
      const personCenturyDeath = century
        ? Math.ceil(person.died / 100)
        : false;

      const personSex = person.sex;

      return personCenturyDeath
        ? personSex === 'm' && century === personCenturyDeath
        : personSex === 'm';
    })
    .map(({ born, died }) => died - born);

  const averageMenAge = mensAges
    .reduce((sum, current) => sum + current, 0) / mensAges.length
    .toFixed(2);

  return averageMenAge;
}

/**
//  * @param {object[]} people
//  * @param {boolean} withChildren - optional
//  *
//  * @return {number}
//  */
function calculateWomenAverageAge(people, withChildren) {
  const womanAges = people
    .filter(person => (
      people.find((child) => (
        withChildren
          ? child.mother === person.name && person.sex === 'f'
          : person.sex === 'f'
      ))
    ))
    .map(({ born, died }) => died - born);

  const averageAge = womanAges
    .reduce((sum, current) => sum + current, 0)
      / womanAges.length;

  return +averageAge.toFixed(2);
}

/**
//  * @param {object[]} people
//  * @param {boolean} onlyWithSon - optional
//  *
//  * @return {number}
//  */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDifferences = [];

  people.forEach(person => {
    const personChildren = people
      .filter(child => (
        onlyWithSon
          ? person.name === child.mother && child.sex === 'm'
          : person.name === child.mother
      ))
      .map(child => child.born - person.born);

    ageDifferences.push(...personChildren);
  });

  const avgDifference = ageDifferences
    .reduce((sum, current) => sum + current, 0)
    / ageDifferences.length;

  return +avgDifference.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
