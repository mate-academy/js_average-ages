'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of kid's death by 100: Math.ceil(kid.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const isCenturyFilter = people.filter(kid => (century
    ? kid.sex === 'm' && Math.ceil(kid.died / 100) === century
    : kid.sex === 'm'));

  const age = isCenturyFilter.map(man => man.died - man.born);

  const manAverageAge = age.reduce((a, b) => a + b) / age.length;

  return manAverageAge;
};

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
  const isHaveChildFiltered = people.filter(kid => (withChildren
    ? kid.sex === 'f' && people.some(child => child.mother === kid.name)
    : kid.sex === 'f'));

  const age = isHaveChildFiltered.map(woman => woman.died - woman.born);

  const womenAverageAge = age.reduce((a, b) => a + b) / age.length;

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
  const isHaveSonFiltered = people.filter(kid => (onlyWithSon
    ? kid.sex === 'm' && people.find(mother => mother.name === kid.mother)
    : people.find(mother => mother.name === kid.mother)));

  const ageDiff = isHaveSonFiltered.map(child => child.born
    - people.find(mother => mother.name === child.mother).born);

  return ageDiff.reduce((a, b) => a + b) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
