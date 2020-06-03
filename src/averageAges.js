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
  const persons = century
    ? people.filter((person) => Math.ceil(person.died / 100) === century
      && person.sex === 'm')
    : people.filter((person) => person.sex === 'm');

  return persons.map(person => person.died - person.born)
    .reduce((a, b) => (a + b)) / persons.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter((person) => people
      .some((child) => child.mother === person.name)
      && person.sex === 'f')
    : people.filter(person => person.sex === 'f');

  return women.map((person) => person.died - person.born)
    .reduce((a, b) => (a + b)) / women.length;
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
  const childs = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.some(child => child.name === person.mother))
    : people.filter(person => people.some(i => i.name === person.mother));

  return childs.map(person =>
    person.born - (people.find(i =>
      person.mother === i.name).born))
    .reduce((a, b) => a + b) / childs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
