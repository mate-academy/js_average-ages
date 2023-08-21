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
const MALE_GENDER = 'm';
const FEMALE_GENDER = 'f';
const CENTURY_DURATION = 100;

function countAverageAge(value) {
  return value.reduce((sum, age) => sum + age, 0) / value.length;
};

function calculateMenAverageAge(people, century) {
  const maleAges
    = century === undefined
      ? people
        .filter(({ sex }) => sex === MALE_GENDER)
        .map(({ died, born }) => died - born)
      : people
        .filter(({ sex, died }) => sex === MALE_GENDER
        && Math.ceil(died / CENTURY_DURATION) === century)
        .map(({ died, born }) => died - born);

  return countAverageAge(maleAges);
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
  function isMother(name) {
    return people.some(({ mother }) => mother === name);
  };

  const womenAges
    = withChildren === undefined
      ? people
        .filter(({ sex }) => sex === FEMALE_GENDER)
        .map(({ died, born }) => died - born)
      : people
        .filter(({ sex, name }) => sex === FEMALE_GENDER
          && isMother(name))
        .map(({ died, born }) => died - born);

  return countAverageAge(womenAges);
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
  let childrenWithPresentMothers = people
    .filter(child => people.some(({ name }) => name === child['mother']));

  if (onlyWithSon) {
    childrenWithPresentMothers = childrenWithPresentMothers
      .filter(({ sex }) => sex === MALE_GENDER);
  }

  const totalAgeDifference = childrenWithPresentMothers.reduce((sum, child) => {
    const mother = people.find(({ name }) => name === child['mother']);

    return sum + child['born'] - mother['born'];
  }, 0);

  return totalAgeDifference / childrenWithPresentMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
