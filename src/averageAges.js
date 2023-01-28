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
function calculateMenAverageAge(people, century = 0) {
  return people
    .filter(el => century
      ? el.sex === 'm' && Math.ceil(el.died / 100) === century
      : el.sex === 'm'
    )
    .reduce((sum, el, i, receivedArray) =>
      sum + (el.died - el.born) / receivedArray.length,
      0);
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
  return people
    .filter(el => withChildren
      ? el.sex === 'f' && people.some(child => child.mother === el.name)
      : el.sex === 'f'
    )
    .reduce((sum, el, i, receivedArray) =>
      sum + (el.died - el.born) / receivedArray.length, 0);
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
  return people
    .filter(el => onlyWithSon
      ? el.sex === 'm' && people.some(mother => el.mother === mother.name)
      : people.some((mother) => el.mother === mother.name)
    )
    .reduce((sum, el, i, receivedArray) =>
      sum + (el.born - people.find(mother =>
        mother.name === el.mother).born) / receivedArray.length, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
