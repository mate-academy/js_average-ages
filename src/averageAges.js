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
  const men = people.filter(person => (
    person.sex === 'm' && (!century || Math.ceil(person.died / 100) === century)
  ));

  const sumOfAges = men.reduce((sum, man) => sum + (man.died - man.born), 0);

  const averageAge = sumOfAges / men.length;

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
  const women = people.filter(woman => woman.sex === 'f');

  const womanWithChildren = withChildren
    ? women.filter(woman =>
      people.some(child => child.mother === woman.name))
    : women;

  const sumOfAges = womanWithChildren.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);

  return sumOfAges / womanWithChildren.length;
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
    child.mother && people.some(parent => parent.name === child.mother));

  const childrenFilter = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDifference = childrenFilter.map(person =>
    person.born - people.find(mom => mom.name === person.mother).born);

  const sumAgeDifference = ageDifference.reduce(
    (sum, ageDifferences) => sum + ageDifferences,
    0);

  return sumAgeDifference / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
