/* eslint-disable max-len */
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
  const men = people.filter(person => (
    century
      ? (Math.ceil(person.died / 100) === century) && (person.sex === 'm')
      : person.sex === 'm'
  ));

  const ages = men.reduce((sum, addition) => sum + (addition.died - addition.born), 0);

  return ages / men.length;
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
  const women = people.filter(person => (
    withChildren
      ? people.some(child => child.mother === person.name) && person.sex === 'f'
      : person.sex === 'f'
  ));

  // women = people.filter(person => person.sex === 'f');

  // women = withChildren
  //   ? people.filter(person => people.some(child => child.mother === person.name))
  //   : women;

  const ages = women.reduce((sum, addition) => sum + addition.died - addition.born, 0);

  return ages / women.length;
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
  let women = people.filter(person => person.sex === 'f');

  women = people.filter(person => (
    people.some(child => child.mother === person.name)
  ));

  let children = people.filter(person => (
    people.some(mother => mother.name === person.mother)
  ));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ages = children.map((child) => (
    child.born - women.find((woman) => woman.name === child.mother).born
  ));

  return ages.reduce((sum, addition) => sum + addition, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
