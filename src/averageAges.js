/* eslint-disable no-shadow */
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

  const manWithCentury = people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);

  const man = people.filter(person => person.sex === 'm');

  const sum = arguments.length < 2 ? man.reduce((sum, person) =>
    sum + (person.died - person.born), 0)
    : manWithCentury.reduce((sum, person) =>
      sum + (person.died - person.born), 0);

  const averageAge = arguments.length < 2
    ? sum / man.length : sum / manWithCentury.length;

  return averageAge;
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
  // write code here

  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = women.filter(person =>
    people.some(women => women.mother === person.name));

  const sumAges = arguments.length < 2
    ? women.reduce((sum, person) => sum + (person.died - person.born), 0)
    : womenWithChildren.reduce((sum, person) =>
      sum + (person.died - person.born), 0);

  const womenAverageAge = arguments.length < 2
    ? sumAges / women.length : sumAges / womenWithChildren.length;

  return womenAverageAge;
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
  // write code here

  const mothers = people.filter(person =>
    people.some(child => child.name === person.mother));

  const mothersWithSon = people.filter(person =>
    people.some(child => child.name === person.mother
      && person.sex === 'm'));

  const ageDiffMothersAllkids = mothers.map(person =>
    person.born - people.find(woman => woman.name === person.mother).born);

  const ageDiffMothersSons = mothersWithSon.map(person =>
    person.born - people.find(woman => woman.name === person.mother).born);

  const sumAgeDiff = arguments.length < 2
    ? ageDiffMothersAllkids.reduce((sum, currentValue) => sum + currentValue, 0)
    : ageDiffMothersSons.reduce((sum, currentValue) => sum + currentValue, 0);

  const averageAgeDiff = arguments.length < 2
    ? sumAgeDiff / ageDiffMothersAllkids.length
    : sumAgeDiff / ageDiffMothersSons.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
