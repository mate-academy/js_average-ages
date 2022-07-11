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
  const men = [...people]
    .filter((x) => x.sex === 'm')
    .filter(person => century !== undefined
      ? Math.ceil(person.died / 100) === century
      : true);

  const sumAge = men
    .reduce((sum, person) => sum + person.died - person.born, 0);

  return sumAge / men.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const women = [...people]
    .filter((human) => human.sex === 'f')
    .filter(person => (withChildren === true)
      ? people.some(human => human.mother === person.name)
      : true);

  const sumAge = women
    .reduce((sum, person) => sum + person.died - person.born, 0);

  return sumAge / women.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const children = [...people]
    .filter(person => people.some((human) => human.name === person.mother))
    .filter(person => onlyWithSon === true
      ? person.sex === 'm'
      : true);

  const ageDiff = children.reduce((sum, child) => {
    return sum + child.born
    - people.find(mom => mom.name === child.mother).born;
  }, 0);

  return ageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
