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

const calculateAverageAge = (people) =>
  people.map((person) => person.died - person.born).reduce((a, b) => a + b, 0)
 / people.length;

function calculateMenAverageAge(people, century) {
  const copyPeople = century
    ? people.filter((person) => Math.ceil(person.died / 100) === century)
    : people;
  const filteredPeople = copyPeople.filter((person) => person.sex === 'm');

  return calculateAverageAge(filteredPeople);
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
  const womanWithKid = people.filter((woman) =>
    people.some((kid) => kid.mother === woman.name)
  );

  const copyPeople = withChildren ? womanWithKid : people;

  return calculateAverageAge(copyPeople.filter((woman) => woman.sex === 'f'));
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
  let children = people.filter(
    kid => people.some(mother => mother.name === kid.mother));

  children = !onlyWithSon
    ? children
    : children.filter((person) => person.sex === 'm');

  const agesDiff = children.map(
    kid => kid.born - people.find(person => person.name === kid.mother).born);

  const averageAgeDiff = agesDiff.reduce((a, b) => a + b, 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
