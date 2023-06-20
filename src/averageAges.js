'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const arr = people.filter((person) => (arguments.length > 1
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'));

  return calculate(arr);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const arr = people.filter((person) => (withChildren
    ? people.find((someone) => someone.mother === person.name)
    && person.sex === 'f'
    : person.sex === 'f'));

  return calculate(arr);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  let arr = people.filter((person) => (onlyWithSon
    ? people.find((someone) => someone.name === person.mother)
    && person.sex === 'm'
    : people.find((someone) => someone.name === person.mother)));

  arr = +(arr.reduce((prev, person) =>
    prev + (person.born - people.find((someone) =>
      someone.name === person.mother).born), 0)
    / arr.length).toFixed(2);

  return arr;
}

function calculate(arr) {
  return +(arr.reduce((prev, person) => prev + (person.died - person.born), 0)
  / arr.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
