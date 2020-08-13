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
  return people.filter(person => (century)
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm')
    .reduce((sum, man, i, arr) => {
      const age = man.died - man.born;

      return sum + age / arr.length;
    }, 0);
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
  return people.filter(person => (withChildren)
    ? people.some(child => person.name === child.mother)
    : person.sex === 'f')
    .reduce((sum, woman, i, arr) => {
      const age = woman.died - woman.born;

      return sum + age / arr.length;
    }, 0);
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
  return people.filter(child =>
    people.some(mother => (onlyWithSon)
      ? child.mother === mother.name && child.sex === 'm'
      : child.mother === mother.name))
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born)
    .reduce((sum, person, i, arr) => sum + person / arr.length, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
