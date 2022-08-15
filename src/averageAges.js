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

function calculateAverage(array) {
  return array.reduce((a, b) => a + b, 0) / array.length;
};

function calculateMenAverageAge(people, century) {
  const mens = people.filter(item =>
    century
      ? item.sex === 'm' && Math.ceil(item.died / 100) === century
      : item.sex === 'm');

  const age = mens.map(item => item.died - item.born);

  return calculateAverage(age);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const females = (withChildren
    ? people.filter(
      ({ name }) => people.some(({ mother }) => mother === name))
    : people.filter(
      ({ sex }) => sex === 'f'));

  const age = females.map(item => item.died - item.born);

  return calculateAverage(age);
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const withChildren = (onlyWithSon
    ? people.filter(person =>
      person.sex === 'm'
      && people.find(mom => person.mother === mom.name))
    : people.filter(person =>
      people.find(mom => person.mother === mom.name)));

  const age = withChildren.map(item =>
    item.born - people.find(mom => item.mother === mom.name).born);

  return calculateAverage(age);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
