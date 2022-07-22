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
  const manFiltered = (!century)
    ? people.filter((person) => person.sex === 'm')
    : people.filter((person) =>
      Math.ceil(person.died / 100) === century && person.sex === 'm');

  const manAgeOfLife = manFiltered
    .map(person => person.died - person.born);

  return manAgeOfLife
    .reduce((a, b) => a + b) / manFiltered.length;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const allMothers = people.map(person => person.mother);
  const isMother = people.filter(person => allMothers.includes(person.name));

  const womanFiltered = (withChildren)
    ? isMother
    : people.filter((person) => person.sex === 'f');

  const womanAgeOfLife = womanFiltered
    .map(person => person.died - person.born);

  return womanAgeOfLife
    .reduce((a, b) => a + b) / womanFiltered.length;
};

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their allMothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const allMothers = people.map(person => person.mother);
  const isMother = people.filter(person => allMothers.includes(person.name));
  const isMotherNames = isMother.map(person => person.name);

  const hasMotherOnList = (onlyWithSon)
    ? people.filter(person => isMotherNames.includes(person.mother)
        && person.sex === 'm')
    : people.filter(person => isMotherNames.includes(person.mother));

  const motherObj = {};

  isMother.map(function(person) {
    motherObj[person.name] = person.born;
  });

  const arrResult = hasMotherOnList.map(person =>
    person.born - motherObj[person.mother]);

  return arrResult.reduce((a, b) => a + b) / arrResult.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
