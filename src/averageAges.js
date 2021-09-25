/* eslint-disable no-shadow */
'use strict';

// eslint-disable-next-line no-unused-vars
const people = require('./people');

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
function calculateMenAverageAge(people, century) {
  const age = people
    .filter(person => person.sex === 'm')
    .filter(man => !century || getCentury(man) === century)
    .map(person => person.died - person.born);

  return getAverage(age);
}

function getCentury(person) {
  return Math.ceil(person.died / 100);
}

function getAverage(numbers) {
  return numbers.reduce((a, b) => a + b) / numbers.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const age = people
    .filter(person => person.sex === 'f')
    .filter(woman => !withChildren || haveChildren(people, woman.name))
    .map(person => person.died - person.born);

  return getAverage(age);
}

function haveChildren(people, name) {
  return people.some(person => person.mother === name);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const age = people
    .filter(person => !onlyWithSon || person.sex === 'm')
    .map(child => [child, getMother(people, child)])
    .filter(([, mother]) => mother)
    .map(([child, mother]) => child.born - mother.born);

  return getAverage(age);
}

function getMother(people, child) {
  return people.find(mother => mother.name === child.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
