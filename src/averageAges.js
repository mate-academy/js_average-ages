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
  const allMen = people.filter(man => !century
    ? man.sex === 'm'
    : man.sex === 'm' && Math.ceil(man.died / 100) === century);

  return allMen.reduce((sum, ages) =>
    sum + (ages.died - ages.born), 0) / allMen.length;
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
  const allWomen = people.filter(women => !withChildren
    ? women.sex === 'f'
    : women.sex === 'f' && people.some(baby => baby.mother === women.name));

  return allWomen.reduce((sum, ages) =>
    sum + (ages.died - ages.born), 0) / allWomen.length;
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
  const children = people.filter(baby => !onlyWithSon
    ? people.some(mom => mom.name === baby.mother)
    : people.some(mom => mom.name === baby.mother) && baby.sex === 'm');

  const calcAges = children.map(person =>
    person.born - people.find(mom => mom.name === person.mother).born);

  return calcAges.reduce((sum, ages) => sum + ages) / calcAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
