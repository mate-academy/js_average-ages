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

const oneHundredYears = 100;
const maleSex = 'm';
const femaleSex = 'f';

function calculateMenAverageAge(people, century = null) {
  const men = people.filter(person => person.sex === maleSex);
  const filteredMen = century !== null
    ? men.filter(person => Math.ceil(person.died
      / oneHundredYears) === century)
    : men;
  const sumAge = filteredMen.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return sumAge / filteredMen.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const woomen = people.filter(person => person.sex === femaleSex);
  const filteredWoomen = withChildren !== false ? woomen.filter(woman =>
    withChildren
      ? people.some(person =>
        person.mother === woman.name)
      : true)
    : woomen;
  const sumAge = filteredWoomen.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return sumAge / filteredWoomen.length;
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
  const mothers = people.filter(mom =>
    people.some(child => child.mother === mom.name));

  const childrenWithMothers = people.filter(child =>
    (!onlyWithSon && mothers.some(mom => mom.name === child.mother))
    || (onlyWithSon && child.sex === maleSex
    && mothers.some(mom => mom.name === child.mother))
  );

  const ageDifferenceSum = childrenWithMothers.reduce((diffSum, child) => {
    const mother = mothers.find(mom => mom.name === child.mother);
    const ageDiff = child.born - mother.born;

    return diffSum + ageDiff;
  }, 0);

  return ageDifferenceSum / childrenWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
