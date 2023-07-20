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
  const men = people
    .filter((person) => (
      century === undefined
      || Math.ceil(person.died / 100) === century
    ))
    .filter((person) => person.sex === 'm');

  return men.reduce((sum, person) => (
    sum + (person.died - person.born)
  ), 0) / men.length;
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
  const women = people
    .filter((person) => person.sex === 'f')
    .filter((person) => (
      withChildren === undefined
      || people.find((child) => person.name === child.mother)
    ));

  return women.reduce((sum, person) => (
    sum + (person.died - person.born)
  ), 0) / women.length;
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
    .filter((person) => (
      person.mother !== null
      && people.find((mother) => mother.name === person.mother)
    ))
    .filter((person) => (
      onlyWithSon === undefined
      || person.sex === 'm'
    ));

  const mothers = people
    .filter((person) => person.sex === 'f')
    .filter((person) => (
      children.find((child) => person.name === child.mother)
    ));

  const ageDifferences = children
    .map((person) => (
      person.born - mothers.find((mother) => mother.name === person.mother).born
    ));

  return ageDifferences.reduce((sum, difference) => (
    sum + difference
  ), 0) / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
