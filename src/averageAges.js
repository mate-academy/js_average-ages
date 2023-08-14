'use strict';

const SEX_MALE = 'm';
const SEX_FEMALE = 'f';
const CENTURY_DIVIDER = 100;

function summOfAge(people) {
  return people.reduce((acc, { died, born }) => acc + died - born, 0);
}

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
  let men = people.filter(({ sex }) => sex === SEX_MALE);

  if (century) {
    men = men.filter(({ died }) =>
      Math.ceil(died / CENTURY_DIVIDER) === century);
  }


  return summOfAge(men) / men.length;
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
  let women = people.filter(({ sex }) => sex === SEX_FEMALE);

  const mothers = women.filter(({ name }) =>
    people.some(({ mother }) => mother === name));

  if (withChildren) {
    women = mothers;
  }

  return summOfAge(women) / women.length;
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
  let children = people.filter(({ mother }) =>
    mother !== null && people.find((person) => person.name === mother));

  if (onlyWithSon) {
    children = children.filter(({ sex }) => sex === SEX_MALE);
  }

  const sumOfDifference = children
    .reduce((acc, child) => {
      const { born, mother: motherName } = child;
      const mother = people.find(person => person.name === motherName);

      return acc + born - mother.born;
    }, 0);

  return sumOfDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
