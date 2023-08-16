/* eslint-disable no-console */
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
const ONE_CENTURY = 100;

function getAverageAge(people) {
  const totalAge = people.reduce((total, { died, born }) => (
    total + (died - born)
  ), 0);

  return totalAge / people.length;
}

function calculateMenAverageAge(people, century) {
  const filteredMen = people.filter(person => person.sex === SEX_MALE
    && (century
      ? Math.ceil(person.died / ONE_CENTURY) === century
      : true)
  );

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
  const filteredWomen = people.filter(person => person.sex === SEX_FEMALE
    && (withChildren
      ? people.some(({ mother }) => mother === person.name)
      : true)
  );

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
  const children = people.filter(child => people
    .find(person => child.mother === person.name
      && (onlyWithSon
        ? child.sex === SEX_MALE
        : people.some((mother) => child.mother === mother.name))
    )
  );

  return children.reduce((acc, child) => {
    const motherBirthYear = people.find(person => (
      child.mother === person.name
    )).born;

    return acc + child.born - motherBirthYear;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
