'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter((person) => (arguments.length > 1
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'));

  return calculate(filteredMen);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter((person) => (withChildren
    ? people.find((someone) => someone.mother === person.name)
    && person.sex === 'f'
    : person.sex === 'f'));

  return calculate(filteredWomen);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredPeople = people.filter((person) => (onlyWithSon
    ? people.find((someone) => someone.name === person.mother)
    && person.sex === 'm'
    : people.find((someone) => someone.name === person.mother)));

  return +(filteredPeople.reduce((prev, person) =>
    prev + (person.born - people.find((someone) =>
      someone.name === person.mother).born), 0)
    / filteredPeople.length).toFixed(2);
}

function calculate(filteredPeople) {
  return filteredPeople
    .map(person => person.died - person.born).reduce((prev, person) =>
      prev + person, 0) / filteredPeople.length.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
