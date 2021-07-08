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
  const men = people.filter(person => century
    ? person.sex === 'm' && century === Math.ceil(person.died / 100)
    : person.sex === 'm');

  const averageAgeSum = men.reduce((sum, person) =>
    sum + person.died - person.born, 0);

  return averageAgeSum / men.length;
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
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && people.find(user =>
      user.mother === person.name) !== undefined
    : person.sex === 'f');

  const averageWomenAgeSum = women.reduce((sum, person) => {
    return sum + person.died - person.born;
  }, 0);

  const result = Math.round(averageWomenAgeSum * 100 / women.length) / 100;

  return result;
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
  const childrenArr = people.filter(child => onlyWithSon
    ? people.find(mother => child.mother === mother.name) && child.sex === 'm'
    : people.find(mother => child.mother === mother.name));

  const ageDiff = childrenArr.map(child => child.born - people.find(
    mother => mother.name === child.mother).born);

  return ageDiff.reduce((sum, difference) =>
    sum + difference, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
