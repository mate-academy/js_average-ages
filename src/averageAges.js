'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
const Calculate = {
  getCentury(number) {
    return Math.ceil(number / 100);
  },
};

const calculateLifeDuration = (people) => {
  return people.reduce((acc, person) => {
    return acc + person.died - person.born;
  }, 0) / people.length;
};

function calculateMenAverageAge(people, century = false) {
  const men = people.filter((person) => person.sex === 'm');

  function getMenBornedInCentury() {
    const normalizedMen = men.filter((person) => {
      return Calculate.getCentury(person.died) === century;
    });

    return (
      normalizedMen.reduce((acc, person) => {
        return acc + person.died - person.born;
      }, 0) / normalizedMen.length
    );
  }

  return century ? getMenBornedInCentury() : calculateLifeDuration(men);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  const women = people.filter((person) => person.sex === 'f');

  function getWomenWithChildren() {
    const mothers = people
      .map(person => person.mother)
      .filter(person => person !== undefined && person);

    const womenWithChildren = women.filter((person) => {
      if (mothers.includes(person.name)) {
        return person;
      }
    }).filter(person => person !== undefined && person);

    return calculateLifeDuration(womenWithChildren);
  }

  return withChildren ? getWomenWithChildren() : calculateLifeDuration(women);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const eligiblePeople = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && person.mother !== null && people.some(p => p.name === person.mother))
    : people.filter(person => person.mother !== null
      && people.some(p => p.name === person.mother));

  const totalAgeDiff = eligiblePeople.reduce((sum, person) => {
    const mother = people.find(p => p.name === person.mother);

    if (mother) {
      return sum + (person.born - mother.born);
    }

    return sum;
  }, 0);

  return eligiblePeople.length ? totalAgeDiff / eligiblePeople.length : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
