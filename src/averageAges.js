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
  let result = people.filter(i => i.sex === 'm');

  (century !== undefined)
    ? result = people.filter(i => i.sex === 'm'
  && Math.ceil(i.died / 100) === century)
    : result = people.filter(i => i.sex === 'm');

  result = (result.map(i => i.died - i.born).reduce((a, b) =>
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

  (withChildren !== undefined)
    ? result = result.filter(i => i.sex === 'f'
  && people.some(j => i.name === j.mother))
    : result = result.filter(i => i.sex === 'f');

  result = (result.map(i => i.died - i.born).reduce((a, b) =>
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
  const mothers = [...people].filter(i => i.sex === 'f'
  && people.some(j => j.mother === i.name));

  let children;

  (onlyWithSon !== undefined)
    ? children = people.filter(child => child.sex === 'm'
  && mothers.some(mother => child.mother === mother.name))
    : children = people.filter(child =>
      mothers.some(mother => child.mother === mother.name));

  const result = children.map(child => child.born - mothers.find(mother =>
    mother.name === child.mother).born)
    .reduce((a, b) => a + b) / children.length;

  return +(result).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
