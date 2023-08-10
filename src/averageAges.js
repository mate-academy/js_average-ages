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
const MALE_SEX = 'm';
const FEMALE_SEX = 'f';
const CENTURY_COEFFICIENT = 100;

function calculateMenAverageAge(people, century) {
  const filtredMen = people.filter(({ sex, died }) => sex === MALE_SEX
  && (century
    ? Math.ceil(died / CENTURY_COEFFICIENT) === century
    : true));

  return getAvgAge(filtredMen);
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
  const filtredWomen = people.filter(({ sex, name }) => sex === FEMALE_SEX
  && (withChildren
    ? people.some(({ mother }) => mother === name)
    : true));

  return getAvgAge(filtredWomen);
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
  const filteredPeople = people
    .filter(person => (onlyWithSon
      ? person.sex === MALE_SEX
      : true) && (people.some(child => child.name === person.mother)
    ));

  const ageAverage = filteredPeople.reduce((acc, { born, mother }) => {
    const birthYearOfMom = people.find(({ name }) => name === mother).born;

    return acc + born - birthYearOfMom;
  }, 0);

  return ageAverage / filteredPeople.length;
}

function getAvgAge(people) {
  const sumOfAges = people
    .reduce((sum, { died, born }) => sum + (died - born), 0);

  return sumOfAges / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
