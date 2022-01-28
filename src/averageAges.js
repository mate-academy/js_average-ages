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
  const men = people.filter(man => man.sex === 'm'
    && (century
      ? Math.ceil(man.died / 100) === century
      : true));

  const age = men.reduce((prev, item) =>
    prev + (item.died - item.born), 0) / men.length;

  return age;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const women = people.filter(woman => woman.sex === 'f'
    && (withChildren
      ? people.some(child => child.mother === woman.name)
      : true));

  const age = women.reduce((prev, item) =>
    prev + (item.died - item.born), 0) / women.length;

  return age;
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
  const women = people.filter(woman =>
    people.some(child => child.mother === woman.name
      && (onlyWithSon
        ? child.sex === 'm'
        : true)
    ));

  const children = people.filter(child =>
    people.some(woman => woman.name === child.mother)
      && (onlyWithSon
        ? child.sex === 'm'
        : true));

  const age = children.reduce((prev, item) =>
    prev + (item.born - women.find(mother =>
      item.mother === mother.name).born), 0)
    / children.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
