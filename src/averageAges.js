'use strict';

const INITIAL_VALUE = 0;
const FEMALE_SEX = 'f';
const MALE_SEX = 'm';

const getAverageAge = people => {
  const ageAmount = people.reduce((a, b) => a + b, INITIAL_VALUE);

  return +(ageAmount / people.length).toFixed(2);
};

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
  const filteredMen = people.filter(({ died, sex }) => sex === MALE_SEX
      && (century ? Math.ceil(died / 100) === century : true));

  const ageOfMen = filteredMen.map(({ born, died }) => died - born);

  return getAverageAge(ageOfMen);
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
  const filteredWomen = people.filter(({ name, sex }) => sex === FEMALE_SEX
      && (withChildren ? people.some(({ mother }) => mother === name) : true));

  const ageOfWomen = filteredWomen.map(({ born, died }) => died - born);

  return getAverageAge(ageOfWomen);
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
  const filteredChildren = people.filter(({ sex, mother }) => {
    const allChildren = people.some(({ name }) => name === mother);

    return allChildren && (onlyWithSon ? sex === MALE_SEX : true);
  });

  const ageAverage = filteredChildren.reduce((acc, { born, mother }) => {
    const motherBirthYear = people.find(({ name }) => name === mother).born;

    return acc + born - motherBirthYear;
  }, 0);

  return +(ageAverage / filteredChildren.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
