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
  const male = people
    .filter((person) =>
      person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century));

  return calculateAverageAge(male);
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
  const female = people
    .filter(person =>
      person.sex === 'f'
      && (!withChildren
        || people.some((child) => child.mother === person.name))
    );

  return calculateAverageAge(female);
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
  const children = people.filter(child =>
    (!onlyWithSon || child.sex === 'm')
    && people.some(person => person.name === child.mother));

  const ageDifferences = children.map(child => (
    child.born - people.find(person => person.name === child.mother).born
  ));

  return ageDifferences
    .reduce((sum, age) => sum + age, 0) / ageDifferences.length;
}

function calculateAverageAge(people) {
  const averageAge = people.reduce(
    (sum, person) => sum + (person.died - person.born), 0) / people.length;

  return +averageAge.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
