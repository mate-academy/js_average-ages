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
  let mens = [];

  century === undefined
    ? mens = people.filter(person => person.sex === 'm')
    : mens = people.filter(person => person.sex === 'm')
      .filter(person => Math.ceil(person.died / 100) === century);

  const mensAges = mens.map(person => (person.died - person.born));

  return mensAges.reduce((prev, cur) => prev + cur, 0) / mensAges.length;
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
  let women = [];

  withChildren === undefined
    ? women = people.filter(person => person.sex === 'f')
    : women = people.filter((person) => person.sex === 'f'
              && people.some(w => person.name === w.mother));

  const womenAges = women.map(w => (w.died - w.born));

  return womenAges.reduce((prev, cur) => prev + cur, 0) / womenAges.length;
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
  let children = [];

  onlyWithSon === undefined
    ? children = people
      .filter(person => people.some(woman => person.mother === woman.name))
    : children = people
      .filter(person => people
        .some(woman => person.mother === woman.name && person.sex === 'm'));

  const mothers = people.filter((person) => person.sex === 'f'
        && people.some(w => person.name === w.mother));

  return children
    .map(child => mothers.map(woman => woman.name === child.mother
      ? child.born - woman.born
      : 0)
      .filter(age => age > 0)).flat()
    .reduce((a, b) => a + b) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
