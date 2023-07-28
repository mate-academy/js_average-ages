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

function calculateMenAverageAge(people, century = false) {
  const men = people.filter((person) => person.sex === 'm');

  if (century) {
    const normalizedMen = men.filter((person) => {
      return Calculate.getCentury(person.died) === century;
    });

    return (
      normalizedMen.reduce((acc, person) => {
        return acc + person.died - person.born;
      }, 0) / normalizedMen.length
    );
  } else {
    return (
      men.reduce((acc, person) => {
        return acc + person.died - person.born;
      }, 0) / men.length
    );
  }
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  const women = people.filter((person) => person.sex === 'f');

  if (withChildren) {
    const mothers = people
      .map(person => person.mother)
      .filter(person => person !== undefined && person);

    const womenWithChildren = women.filter((person) => {
      if (mothers.includes(person.name)) {
        return person;
      }
    }).filter(person => person !== undefined && person);

    return womenWithChildren.reduce((acc, person) => {
      return acc + (person.died - person.born);
    }, 0) / womenWithChildren.length;
  } else {
    return (
      women.reduce((acc, person) => {
        return acc + person.died - person.born;
      }, 0) / women.length
    );
  }
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
