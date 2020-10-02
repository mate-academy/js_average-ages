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
function calculateMenAverageAge(people, century) {
  let filteredMen = [];

  if (century) {
    filteredMen = people.filter(person =>
      person.sex === 'm' && (Math.ceil(person.died / 100) === century));
  } else {
    filteredMen = people.filter(person => person.sex === 'm');
  }

  return filteredMen.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / filteredMen.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let filteredWomen = [];

  if (withChildren) {
    filteredWomen = people.filter(
      person => person.sex === 'f' && people.some(
        human => human.mother === person.name));
  } else {
    filteredWomen = people.filter(person => person.sex === 'f');
  }

  return filteredWomen.reduce(
    (sum, person) => sum + (person.died - person.born), 0)
    / filteredWomen.length;
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
  let filteredDifferentAge = [];

  if (onlyWithSon) {
    filteredDifferentAge = people.filter(
      person => people.some(
        human => human.name === person.mother)
        && person.sex === 'm');
  } else {
    filteredDifferentAge = people.filter(
      person => people.some(human => human.name === person.mother));
  }

  const age = filteredDifferentAge.map(
    person => person.born - people.find(
      mother => mother.name === person.mother).born
  );

  return age.reduce((a, b) => a + b) / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
