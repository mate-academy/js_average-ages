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

  const filteredPeople = people.filter(({ sex, died }) =>
    sex === 'm' && (century
      ? Math.ceil(died / 100) === century
      : true));

  const averageAge = Math.round(filteredPeople.reduce(
    (prev, curr) =>
      prev + curr.died - curr.born, 0) * 100 / filteredPeople.length) / 100;

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
  const filteredPeople = people.filter(({ sex, name: personName }) =>
    sex === 'f' && (withChildren
      ? people.some(({ mother }) => personName === mother)
      : true));

  const averageAge = Math.round(filteredPeople.reduce(
    (prev, curr) =>
      prev + curr.died - curr.born, 0) * 100 / filteredPeople.length) / 100;

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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const peopleWithMothers = onlyWithSon
    ? people.filter(({ sex, mother }) =>
      people.find(({ name }) => mother === name) && sex === 'm')
    : people.filter(({ mother }) =>
      people.find(({ name }) => mother === name));

  const averageAge = Math.round(peopleWithMothers.reduce(
    (prev, curr) =>
      prev + curr.born
      - people.find(({ name }) => curr.mother === name).born, 0)
      * 100 / peopleWithMothers.length) / 100;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
