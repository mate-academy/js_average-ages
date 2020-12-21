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
  const men = people.filter(person => person.sex === 'm'
    && (!century
      ? true
      : Math.ceil(person.died / 100) === century));

  const getAverageAges = men.map(({ died, born }) => died - born)
    .reduce((sum, age) => sum + age, 0) / men.length;

  return getAverageAges;
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
  const women = people.filter(person => person.sex === 'f'
  && (!withChildren
    ? true
    : people.some(child => child.mother === person.name)));

  const getAverageAges = women.map(({ died, born }) => died - born)
    .reduce((sum, age) => sum + age, 0) / women.length;

  return getAverageAges;
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
  const arrChildren = people.filter(child => (!onlyWithSon
    ? people.some(mum => mum.name === child.mother)
    : people.some(mum => mum.name === child.mother) && (child.sex === 'm')
  ));

  const getDifferentMotherChildAges = arrChildren.map(child => child.born
    - (people.find(mum => mum.name === child.mother).born));

  const getAverageDifferentMotherChildAges = getDifferentMotherChildAges
    .reduce((sum, age) => sum + age, 0)
    / arrChildren.length;

  return getAverageDifferentMotherChildAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
