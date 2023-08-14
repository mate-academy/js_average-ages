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
const MALE_SEX_VALUE = 'm';
const FEMALE_SEX_VALUE = 'f';

function getAverageAge(array) {
  const averageAge = Math.round(array.reduce(
    (prev, { died, born }) =>
      prev + died - born, 0) * 100 / array.length) / 100;

  return averageAge;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filteredPeople = people.filter(({ sex, died }) =>
    sex === MALE_SEX_VALUE && (century
      ? Math.ceil(died / 100) === century
      : true));

  const averageAge = getAverageAge(filteredPeople);

  return averageAge;
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
  const filteredPeople = people.filter(({ sex, name: personName }) =>
    sex === FEMALE_SEX_VALUE && (withChildren
      ? people.some(({ mother }) => personName === mother)
      : true));

  const averageAge = getAverageAge(filteredPeople);

  return averageAge;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  let peopleWithMothers = people.filter(({ mother }) =>
    people.find(({ name }) => mother === name));

  if (onlyWithSon) {
    peopleWithMothers = peopleWithMothers.filter(
      ({ sex }) => sex === MALE_SEX_VALUE);
  }

  const totalAgeDiff = peopleWithMothers.reduce(
    (prev, { born: personBorn, mother }) => {
      const motherBorn = people.find(({ name }) => mother === name).born;
      const ageDiff = personBorn - motherBorn;

      return prev + ageDiff;
    }, 0);

  const averageAgeDiff
    = Math.round(totalAgeDiff * 100 / peopleWithMothers.length) / 100;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
