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
  const menOfCentury = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return getSumOfAges(menOfCentury) / menOfCentury.length;
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
  const womenWithChildren = people.filter(
    person => people.map(child => child.mother).includes(person.name)
  );

  const women = withChildren
    ? womenWithChildren
    : people.filter(human => human.sex === 'f');

  return getSumOfAges(women) / women.length;
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
  const allChildren = people
    .filter(person => people
      .some(woman => woman.name === person.mother));

  const sons = allChildren.filter(child => child.sex === 'm');

  const children = onlyWithSon ? sons : allChildren;

  const ageDifferences = children
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  const sumOfageDifferences = ageDifferences.reduce((a, b) => (a + b), 0);

  return sumOfageDifferences / ageDifferences.length;
}

function getSumOfAges(people) {
  const sumOfAges = people
    .map(person => person.died - person.born)
    .reduce((a, b) => (a + b), 0);

  return sumOfAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
