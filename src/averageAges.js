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
  const men = people.filter((person) => person.sex === 'm');
  const menInCentury = men
    .filter((person) => Math.ceil(person.died / 100) === century);
  const allMenInCenturyAge = menInCentury
    .map(person => (person.died - person.born));
  const agesSum = allMenInCenturyAge.reduce((a, b) => a + b, 0);
  const averageAgeWithCentury = agesSum / allMenInCenturyAge.length;
  const averageMenAge = men.map(person => (person.died - person.born))
    .reduce((a, b) => a + b, 0) / men.length;

  return century !== undefined
    ? Number(averageAgeWithCentury.toFixed(2))
    : Number(averageMenAge.toFixed(2));
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

  const women = withChildren
    ? people.filter(person =>
      (person.sex === 'f' && haveChildren(people, person.name)))
    : people.filter(person => person.sex === 'f');

  const womenTotalAge = women
    .reduce((v, person) => v + (person.died - person.born), 0);

  const womenAverageAge = womenTotalAge / women.length;

  return Number(womenAverageAge.toFixed(2));
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
  const all = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const ages = all
    .map(person => {
      const mother = people.find(woman => woman.name === person.mother);

      return mother ? person.born - mother.born : null;
    })
    .filter(el => el);

  const averageAgeDiff = ages
    .reduce((a, b) => a + b) / ages.length;

  return Number(averageAgeDiff.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
