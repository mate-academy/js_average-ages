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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filteredPeople = (!century)
    ? people.filter(({ sex }) => sex === 'm')
    : people.filter(({ sex, died }) => (
      sex === 'm' && Math.ceil(died / 100) === century));

  const averageAge = filteredPeople.reduce((sum, { born, died }) => (
    sum + died - born), 0) / filteredPeople.length;

  return averageAge;
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
  // write code here
  const filteredPeople = (!withChildren)
    ? people.filter(({ sex }) => sex === 'f')
    : people.filter(({ name }) => (
      people.find(({ mother }) => name === mother)));

  const averageAge = filteredPeople.reduce((sum, { born, died }) => (
    sum + died - born), 0) / filteredPeople.length;

  return averageAge;
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
  // write code here
  const filteredPeople = (!onlyWithSon)
    ? people.filter(({ mother }) => people.find(({ name }) => mother === name))
    : people.filter(({ mother, sex }) => people.find(({ name }) => (
      mother === name) && sex === 'm'));

  const averageAge = filteredPeople.reduce((sum, child) => {
    return sum + child.born - people.find(({ name }) => (
      child.mother === name)).born;
  }, 0) / filteredPeople.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
