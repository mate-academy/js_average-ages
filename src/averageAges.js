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

// const people = require('./people');

function calculateAverage(arr) {
  return arr.reduce((prev, current) => prev + current, 0) / arr.length;
}

function calculateMenAverageAge(people, century) {
  const sorted = century
    ? people.filter(person => person.sex === 'm'
      && century === Math.ceil(person.died / 100))
    : people.filter(person => person.sex === 'm');

  const mapped = sorted.map(person => person.died - person.born);

  return calculateAverage(mapped);
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
function calculateWomenAverageAge(people, withChildren) {
  const sorted = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(b => person.name === b.mother))
    : people.filter(person => person.sex === 'f');

  const mapped = sorted.map(person => person.died - person.born);

  return calculateAverage(mapped);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *child.mother
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter((child) => onlyWithSon
    ? child.sex === 'm' && child.mother : child.mother);
  const diff = children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return mother
      ? child.born - mother.born : null;
  });

  const filteredDiff = diff.filter(item => item);

  return calculateAverage(filteredDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
