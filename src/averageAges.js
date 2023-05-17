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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const mens = people
    .filter(person => {
      const personCenturyDeath = Math.ceil(person.died / 100);
      const personSex = person.sex;

      return century
        ? personSex === 'm' && century === personCenturyDeath
        : personSex === 'm';
    });

  const averageMenAge = mens
    .reduce((prev, { born, died }) => prev + (died - born), 0) / mens.length
    .toFixed(2);

  return averageMenAge;
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
//  * @param {object[]} people
//  * @param {boolean} withChildren - optional
//  *
//  * @return {number}
//  */
function calculateWomenAverageAge(people, withChildren) {
  const filteredWoman = withChildren
    ? people
      .filter(person => (
        people.find(child => child.mother === person.name && person.sex === 'f')
      ))
    : people
      .filter(person => person.sex === 'f');

  const averageAge = filteredWoman
    .reduce((sum, { born, died }) => sum + (died - born), 0)
      / filteredWoman.length;

  return +averageAge.toFixed(2);
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
//  * @param {object[]} people
//  * @param {boolean} onlyWithSon - optional
//  *
//  * @return {number}
//  */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const differences = [];

  people.forEach(person => {
    const personChildren = onlyWithSon
      ? people
        .filter(child => person.name === child.mother && child.sex === 'm')
      : people
        .filter(child => person.name === child.mother);

    const ageDifference = personChildren
      .map(child => child.born - person.born);

    differences
      .push(...ageDifference);
  });

  const avgDifference = differences
    .reduce((sum, current) => sum + current, 0)
    / differences.length;

  return +avgDifference.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
