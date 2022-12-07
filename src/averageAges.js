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
  const filteredPeople = people.filter((person) => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const totalAverage = filteredPeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const average = totalAverage / filteredPeople.length;

  return average;
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
  const filteredPeople = people.filter((person) => withChildren
    ? person.sex === 'f' && people.find(child => child.mother === person.name)
    : person.sex === 'f');

  const totalAverage = filteredPeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const average = totalAverage / filteredPeople.length;

  return average;
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
  const filteredPeople = people.filter((person) => onlyWithSon
    ? person.sex === 'm' && people.find((mother) =>
      person.mother === mother.name)
    : people.find((mother) => person.mother === mother.name));

  const ageDifference = filteredPeople.map((children) =>
    children.born - people.find((mother) =>
      children.mother === mother.name).born);

  const average = ageDifference.reduce((sum, age) => sum + age, 0);

  return average / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
