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

const SEX_MALE = 'm';
const SEX_FEMALE = 'f';
const CENTURY_CHANGE = 100;
const INITIAL_VALUE = 0;

function getAverageAge(people) {
  return people
    .reduce((sum, person) => sum + (person.died - person.born), INITIAL_VALUE)
    / people.length;
}

function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter(person =>
    century
      ? person.sex === SEX_MALE
        && Math.ceil(person.died / CENTURY_CHANGE) === century
      : person.sex === SEX_MALE);

  return getAverageAge(filteredMen);
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
  const filteredWomen = people.filter(person =>
    withChildren
      ? person.sex === SEX_FEMALE
        && people.some(child => child.mother === person.name)
      : person.sex === SEX_FEMALE);

  return getAverageAge(filteredWomen);
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
  const filteredPeople = people.filter(person =>
    onlyWithSon
      ? person.sex === SEX_MALE && (person.mother)
      : person.mother
  );

  const ageDifferences = filteredPeople
    .map(child => {
      const mother = people.find(person => person.name === child.mother);

      return (mother) ? child.born - mother.born : 0;
    })
    .filter(difference => difference > 0);

  return ageDifferences
    .reduce((sum, age) => sum + age, INITIAL_VALUE) / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
