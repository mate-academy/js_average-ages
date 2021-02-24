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
  const men = people.filter(
    century
      ? (person) => Math.ceil(person.died / 100) === century
      && person.sex === 'm'
      : (person) => person.sex === 'm'
  );

  return men.reduce((prev, current, index, arr) => {
    return (prev + (current.died - current.born) / arr.length);
  }, 0);
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
  const women = people.filter(
    withChildren
      ? (mother) => people.some((child) => child.mother === mother.name)
      : (person) => person.sex === 'f'
  );

  return women.reduce((prevPerson, nextPerson, index, array) => {
    return (prevPerson + (nextPerson.died - nextPerson.born) / array.length);
  }, 0);
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
  const children = people.filter(
    onlyWithSon
      ? (person) => people.some(woman => person.mother === woman.name)
      && person.sex === 'm'
      : (person) => people.some(woman => person.mother === woman.name)
  );

  return children
    .map(person =>
      person.born - people.find(woman => woman.name === person.mother).born)
    .reduce((prev, current) => prev + current) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
