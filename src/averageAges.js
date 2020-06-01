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
  let average;

  (century === undefined)
    ? average = people.filter(man => man.sex === 'm').reduce(
      (sum, man) => sum + (man.died - man.born), 0)
      / people.filter(man => man.sex === 'm').length
    : average = people.filter(man =>
      Math.floor(man.died / 100) === century - 1
      && man.sex === 'm').reduce((sum, man) =>
      sum + (man.died - man.born), 0) / people.filter(man =>
      Math.floor(man.died / 100) === century - 1
      && man.sex === 'm').length;

  return average;
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
  let average;

  if (withChildren === undefined) {
    average = people.filter(woman => woman.sex === 'f').reduce(
      (sum, woman) => sum + (woman.died - woman.born), 0)
      / people.filter(woman => woman.sex === 'f').length;
  } else {
    const children = people.filter(child => child.mother !== null);
    const mothersNames = Array.from(new Set(Array.from(
      children, child => child.mother)));
    const mothersFullData = people.filter(person =>
      mothersNames.includes(person.name));

    return mothersFullData.reduce((sum, woman) =>
      sum + (woman.died - woman.born), 0) / mothersFullData.length;
  }

  return average;
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
  let average;

  if (onlyWithSon === undefined) {
    const children = people.filter(child => child.mother !== null);
  }

  console.log(children)
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
