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
  const mens = (!century)
    ? people.filter(({ sex }) => sex === 'm')
    : people.filter(({ sex, died }) => (
      sex === 'm' && Math.ceil(died / 100) === century
    ));

  return mens.reduce((averageAge, { died, born }) => {
    return averageAge + (died - born);
  }, 0) / mens.length;
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
  const women = (!withChildren)
    ? people.filter(({ sex }) => sex === 'f')
    : people.filter((woman) => (
      woman.sex === 'f' && people.some(child => child.mother === woman.name)
    ));

  return women.reduce((averageAge, { died, born }) => {
    return averageAge + (died - born);
  }, 0) / women.length;
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
  const children = onlyWithSon
    ? people.filter(child => (
      child.sex === 'm' && people.some(woman => woman.name === child.mother)
    ))
    : people.filter(child => (
      people.some(woman => woman.name === child.mother)
    ));

  return children.reduce((res, { mother, born }) => {
    return res + born - people.find(({ name }) => name === mother).born;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
