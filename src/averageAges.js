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
  return people.filter(man => century
    ? man.sex === 'm' && Math.ceil(man.died / 100) === century : man.sex === 'm'
  )
    .map(man => man.died - man.born)
    .reduce((a, b, index, array) => a + b / array.length, 0);
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
  return people.filter(woman => withChildren
    ? people.some(child => woman.name === child.mother) : woman.sex === 'f'
  ).map(woman => woman.died - woman.born)
    .reduce((a, b, index, array) => a + b / array.length, 0);
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
  return people.filter(child => onlyWithSon
    ? child.sex === 'm' && people.some(mother => child.mother === mother.name)
    : people.some(mother => child.mother === mother.name))
    .map(child =>
      child.born - people.find(mother => child.mother === mother.name).born)
    .reduce((a, b, index, array) => a + b / array.length, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
