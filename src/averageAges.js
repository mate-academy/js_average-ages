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
  let result = people.filter(person => person.sex === 'm');

  (century)
    ? result = people.filter(person => person.sex === 'm'
  && Math.ceil(person.died / 100) === century)
    : result = people.filter(person => person.sex === 'm');

  result = (result.map(person => person.died - person.born).reduce((a, b) =>
    a + b) / result.length).toFixed(2);

  return +result;
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
  let result = [...people];

  (withChildren)
    ? result = result.filter(mom => mom.sex === 'f'
  && people.some(child => mom.name === child.mother))
    : result = result.filter(woman => woman.sex === 'f');

  result = (result.map(person => person.died - person.born).reduce((a, b) =>
    a + b) / result.length).toFixed(2);

  return +result;
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
  const mothers = [...people].filter(mom => mom.sex === 'f'
  && people.some(child => child.mother === mom.name));

  let children;

  (onlyWithSon)
    ? children = people.filter(child => child.sex === 'm'
  && mothers.some(mom => child.mother === mom.name))
    : children = people.filter(child =>
      mothers.some(mom => child.mother === mom.name));

  const result = children
    .map(child => {
      const moms = mothers.find(mother =>
        mother.name === child.mother);

      return child.born - moms.born;
    })
    .reduce((a, b) => a + b) / children.length;

  return +(result).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
