'use strict';

const CENTURY = 100;
const MALE = 'm';
const FEMALE = 'f';

function checkIsMale(person) {
  return person.sex === MALE;
}

function checkIsFemale(person) {
  return person.sex === FEMALE;
}

function calculateAge(person) {
  return person.died - person.born;
}

function calculateAverageAge(people, filterFunction) {
  const filteredPeople = people.filter(filterFunction);

  const totalAge = filteredPeople.reduce((sum, person) =>
    sum + calculateAge(person), 0
  );

  return filteredPeople.length ? totalAge / filteredPeople.length : 0;
}

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  return calculateAverageAge(people, (person) =>
    checkIsMale(person)
    && (!century
    || Math.ceil(person.died / CENTURY) === century)
  );
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  return calculateAverageAge(people, (person) =>
    checkIsFemale(person)
    && (!withChildren
    || people.some((child) => child.mother === person.name))
  );
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleWithSon = onlyWithSon
    ? people.filter(person => checkIsMale(person))
    : people;

  const { totalAgeDifference, ageDifferencesCount } = peopleWithSon.reduce(
    (accumulator, person) => {
      const mother = people.find(candidateMother =>
        candidateMother.name === person.mother
      );

      if (mother) {
        const ageDiff = person.born - mother.born;

        accumulator.totalAgeDifference += ageDiff;
        accumulator.ageDifferencesCount++;
      }

      return accumulator;
    },
    {
      totalAgeDifference: 0,
      ageDifferencesCount: 0,
    }
  );

  return ageDifferencesCount > 0
    ? totalAgeDifference / ageDifferencesCount
    : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
