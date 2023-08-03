'use strict';

// const people = require('./people');

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

//   // write code here
//   // learn how to use array methods like
//  .filter .map .some .every .find .reduce
//   // avoid using loop and forEach
//   // replace `if ()` statement with &&, || or ?:
//   // without nesting

function calculateMenAverageAge(people, century) {
  const MEN = people.filter((person) => person.sex === 'm');
  const MEN_IN_CENTURY = MEN
    .filter((person) => Math.ceil(person.died / 100) === century);
  const ALL_MEN_IN_CENTURY_AGE = MEN_IN_CENTURY
    .map(person => (person.died - person.born));
  const AGES_SUM = ALL_MEN_IN_CENTURY_AGE.reduce((a, b) => a + b, 0);
  const AVERAGE_AGE_WITH_CENTURY = AGES_SUM / ALL_MEN_IN_CENTURY_AGE.length;
  const AVERAGE_MEN_AGE = MEN.map(person => (person.died - person.born))
    .reduce((a, b) => a + b, 0) / MEN.length;

  return century !== undefined
    ? Number(AVERAGE_AGE_WITH_CENTURY.toFixed(2))
    : Number(AVERAGE_MEN_AGE.toFixed(2));
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
  const haveChildren = (all, name) =>
    all.some(person => person.mother === name);

  const WOMEN = withChildren
    ? people.filter(person =>
      (person.sex === 'f' && haveChildren(people, person.name)))
    : people.filter(person => person.sex === 'f');

  const WOMEN_TOTAL_AGE = WOMEN
    .reduce((v, person) => v + (person.died - person.born), 0);

  const WOMEN_AVERAGE_AGE = WOMEN_TOTAL_AGE / WOMEN.length;

  return Number(WOMEN_AVERAGE_AGE.toFixed(2));
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

//   // 1. find a mother of each person (or only for men)
//   // 2. keep people who have mothers in the array
//   // 3. calculate the difference child.born - mother.born
//   // 4. return the average value

function calculateAverageAgeDiff(people, onlyWithSon) {
  const ALL = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const AGES = ALL
    .map(person => {
      const MOTHER = people.find(woman => woman.name === person.mother);

      return MOTHER ? person.born - MOTHER.born : null;
    })
    .filter(el => el);

  const AVERAGE_AGE_DIFF = AGES
    .reduce((a, b) => a + b) / AGES.length;

  return Number(AVERAGE_AGE_DIFF.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
