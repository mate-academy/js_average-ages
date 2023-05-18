'use strict';

const getAvgValue = (array) => (
  array.reduce((accum, current) => accum + current) / array.length
);

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

  const averageMenAge = getAvgValue(mensAges).toFixed(2);

  return +averageMenAge;
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

  const averageAge = getAvgValue(womanAges).toFixed(2);

  return +averageAge;
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

  const avgDifference = getAvgValue(ageDifferences).toFixed(2);

  return +avgDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
