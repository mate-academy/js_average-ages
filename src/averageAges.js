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
  return century === undefined || century === false
    ? people.filter(person => person.sex === 'm')
      .map(person => person.died - person.born)
      .reduce((a, b, i) => +(a + (b - a) / (i + 1)).toFixed(3), 0)
    : people.filter(person =>
      Math.ceil(person.died / 100) === century && person.sex === 'm')
      .map(person => person.died - person.born)
      .reduce((a, b, i) => +(a + (b - a) / (i + 1)).toFixed(3), 0);
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
  return withChildren === undefined || withChildren === false
    ? people.filter(person => person.sex === 'f')
      .map(person => person.died - person.born)
      .reduce((a, b, i) => +(a + (b - a) / (i + 1)).toFixed(3), 0)
    : people.filter(person =>
      person.sex === 'f' && people.some(child => child.mother === person.name))
      .map(person => person.died - person.born)
      .reduce((a, b, i) => +(a + (b - a) / (i + 1)).toFixed(3), 0);
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
  return onlyWithSon === undefined || onlyWithSon === false
    ? people.filter(child =>
      people.some(mother => child.mother === mother.name))
      .map(child =>
        child.born - people.find(mother => child.mother === mother.name).born)
      .reduce((a, b, i) => a + +((b - a) / (i + 1)).toFixed(3), 0)
    : people.filter(child =>
      people.some(mother => child.mother === mother.name && child.sex === 'm'))
      .map(child =>
        child.born - people.find(mother => child.mother === mother.name).born)
      .reduce((a, b, i) => a + +((b - a) / (i + 1)).toFixed(3), 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
