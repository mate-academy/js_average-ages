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
  let mens = people.filter(person => person.sex === 'm');

  if (century) {
    mens = mens.filter(men => Math.ceil(men.died / 100) === century);
  }

  const mensCount = mens.length;
  const ageSum = mens.reduce((sum, men) => sum + (men.died - men.born), 0);

  return ageSum / mensCount;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let womens = people.filter(person => person.sex === 'f');

  if (withChildren) {
    womens = womens.filter(
      women => people.some(person => person.mother === women.name));
  }

  const womensCount = womens.length;
  const ageSum = womens.reduce(
    (sum, women) => sum + (women.died - women.born), 0);

  return ageSum / womensCount;
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
  let childrens = people.filter(
    person => people.find(
      mother => mother.name === person.mother));

  if (onlyWithSon) {
    childrens = childrens.filter(child => child.sex === 'm');
  }

  const mothers = people.filter(
    person => childrens.find(
      child => child.mother === person.name));

  const sumOfAgeDifferences = childrens.reduce(function(acc, child) {
    const motherOfCurrentChild = mothers.find(
      mother => child.mother === mother.name);

    return acc + (child.born - motherOfCurrentChild.born);
  }, 0);

  return sumOfAgeDifferences / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
