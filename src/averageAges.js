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
  const mens = people.filter(man => century
    ? Math.ceil(man.died / 100) === century && man.sex === 'm'
    : man.sex === 'm'
  );

  const averageAge = mens.reduce(
    (sum, age) => sum + (age.died - age.born), 0) / mens.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(woman => withChildren
    ? people.some(
      child => child.mother === woman.name) && woman.sex === 'f'
    : woman.sex === 'f'
  );

  const averageAge = womens.reduce(
    (sum, age) => sum + (age.died - age.born), 0) / womens.length;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrens = people.filter(child => onlyWithSon
    ? people.some(
      mom => child.mother === mom.name) && child.sex === 'm'
    : people.some(mom => child.mother === mom.name)
  );

  const averageAgeDifference = childrens.reduce(
    (sum, child) => sum + (child.born - people.find(
      mom => child.mother === mom.name).born), 0) / childrens.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
