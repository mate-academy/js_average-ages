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
  const men = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return men
    .map(date => date.died - date.born)
    .reduce((sum, value) => sum + value) / men.length;
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
  const women = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return women
    .map(date => date.died - date.born)
    .reduce((sum, value) => sum + value) / women.length;
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
  const mothers = people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name));

  const children = onlyWithSon
    ? people.filter(person =>
      mothers.some(mother => mother.name === person.mother)
    && person.sex === 'm')
    : people.filter(person => mothers.some(mother =>
      mother.name === person.mother));

  const difference = children.map((son) => (
    son.born - people.find(mom => mom.name === son.mother).born
  ));

  return difference.reduce((sum, value) => sum + value) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
