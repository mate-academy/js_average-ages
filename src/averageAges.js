'use strict';

const INITIAL_VALUE = 0;
const FEMALE_SEX = 'f';
const MALE_SEX = 'm';

const getAverageAge = people => {
  return people.reduce((a, b) => a + b, INITIAL_VALUE) / people.length;
};

const toFixedValue = (result, toValue) => {
  return +result.toFixed(toValue);
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
  const ageOfMen = people
    .filter(({ died, sex }) => sex === MALE_SEX
      && (century ? Math.ceil(died / 100) === century : true))
    .map(({ born, died }) => died - born);

  return toFixedValue(getAverageAge(ageOfMen), 2);
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
  const ageOfWomen = people
    .filter(({ name, sex }) => sex === FEMALE_SEX
      && (withChildren ? people.some(({ mother }) => mother === name) : true))
    .map(({ born, died }) => died - born);

  return toFixedValue(getAverageAge(ageOfWomen), 2);
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
  const children = people
    .filter(({ sex, mother }) => people.some(({ name }) => name === mother)
      && (onlyWithSon ? sex === MALE_SEX : true)
    );

  const average = children
    .reduce((acc, { born, mother }) =>
      acc + born - people.find(({ name }) => name === mother).born, 0)
      / children.length;

  return toFixedValue(average, 2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
