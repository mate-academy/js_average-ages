'use strict';

/* eslint-disable no-console */
// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
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
const MALE_SEX = 'm';
const FEMALE_SEX = 'f';
const CUNTURY_COEFFICIENT = 100;

function calculateMenAverageAge(people, century) {
  const mensOfCenturyArray = people
    .filter(person => person.sex === MALE_SEX)
    .filter(person => century
      ? century === Math.ceil(person.died / CUNTURY_COEFFICIENT) : true);

  const MenAverageAge = mensOfCenturyArray
    .reduce((year, person) => year + person.died - person.born, 0)
    / mensOfCenturyArray.length;

  return MenAverageAge;
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
  const womensOfCenturyArray = people
    .filter(person => person.sex === FEMALE_SEX)
    .filter(person => withChildren
      ? people
        .some(child => child.mother === person.name)
      : true);

  const WomenAverageAge = womensOfCenturyArray
    .reduce((year, person) => year + person.died - person.born, 0)
    / womensOfCenturyArray.length;

  return WomenAverageAge;
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
function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleWithMothers = people
    .filter(person => onlyWithSon
      ? person.sex === MALE_SEX
      : true)
    .filter(person => people
      .some(child => child.name === person.mother));

  const AverageAgeDiff = peopleWithMothers
    .reduce((year, child) => year + child.born - people
      .find(mother => child.mother === mother.name).born, 0)
  / peopleWithMothers.length;

  return AverageAgeDiff;
}

// 1. find a mother of each person (or only for men)
// 2. keep people who have mothers in the array
// 3. calculate the difference child.born - mother.born
// 4. return the average value

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
