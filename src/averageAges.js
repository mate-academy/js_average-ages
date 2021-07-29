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
  const mens = people.filter((person) => (century
    ? (person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : person.sex === 'm')
  );

  return mens.reduce((sum, men) => sum + (men.died - men.born), 0)
    / mens.length;
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
  const womens = people.filter((person) => (withChildren
    ? (people.some((child) => child.mother === person.name))
    : person.sex === 'f')
  );

  return womens.reduce((sum, women) => sum + (women.died - women.born), 0)
    / womens.length;
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
  const childrens = people.filter((person) => (onlyWithSon ? (person.sex === 'm'
    && people.some((mother) => mother.name === person.mother))
    : (people.some((mother) => mother.name === person.mother)))
  );
  const diff = childrens.map((child) =>
    child.born - people.filter((mother) => mother.name === child.mother)[0].born
  );

  return diff.reduce((sum, x) => sum + x, 0) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
