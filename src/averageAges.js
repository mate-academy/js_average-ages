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
  const manAge = people.filter(person => century
    ? person.sex === 'm'
       && Math.ceil(person.died / 100) === century
    : person.sex === 'm')
    .map(person => person.died - person.born);

  const averageManAge = manAge.reduce((totalAges, currentAge) =>
    totalAges + currentAge);

  return averageManAge / manAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womanAge = people
    .filter(person => withChildren
      ? person.sex === 'f'
       && people.some(parent => person.name === parent.mother)
      : person.sex === 'f')
    .map(person => person.died - person.born);

  const averageWomanAge = womanAge.reduce((totalAges, currentAge) =>
    totalAges + currentAge);

  return averageWomanAge / womanAge.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredWithMothers = people.filter(person => onlyWithSon
    ? person.sex === 'm'
      && people
        .some(actualMother => person.mother === actualMother.name)
    : people
      .some(actualMother => person.mother === actualMother.name));

  const differenceBetweenAges = filteredWithMothers
    .map(person => person.born - people
      .find(mother => mother.name === person.mother).born)
    .reduce((totalDifference, currentDifference) =>
      totalDifference + currentDifference);

  return differenceBetweenAges / filteredWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
