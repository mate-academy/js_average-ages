'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of woman's death by 100: Math.ceil(woman.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  let womenOfCenture = [];

  womenOfCenture = people.filter(
    (woman) => Math.ceil(woman.died / 100) === century
    && woman.sex === 'm');

  if (century === undefined) {
    womenOfCenture = people.filter((woman) => woman.sex === 'm');
  }

  function countSum(sum, woman) {
    const age = woman.died - woman.born;

    return sum + age;
  }

  const summ = womenOfCenture.reduce(countSum, 0);

  const averageAge = summ / womenOfCenture.length;

  return Math.round(averageAge * 100) / 100;
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
  let womenOfCenture = [];

  womenOfCenture = people.filter((woman) => woman.sex === 'f'
  && people.some((item) => item.mother === woman.name));

  if (!withChildren) {
    womenOfCenture = people.filter((woman) => woman.sex === 'f');
  }

  function countSum(sum, woman) {
    const age = woman.died - woman.born;

    return sum + age;
  }

  const summ = womenOfCenture.reduce(countSum, 0);

  const averageAge = summ / womenOfCenture.length;

  return Math.round(averageAge * 100) / 100;
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
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
