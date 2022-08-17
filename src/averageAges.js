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
  const filteredPeople = century
    ? people.filter(({ sex, died }) => Math.ceil(died / 100) === century
      && sex === 'm')
    : people.filter(({ sex }) => sex === 'm');
  const length = filteredPeople.length;

  return ((filteredPeople
    .reduce((sumAges, { born, died }) => sumAges + (died - born), 0)) / length
  );
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
  const filteredPeople = withChildren
    ? people.filter(({ sex, name }) => (
      people.some(({ mother }) => mother === name)) && sex === 'f')
    : people.filter(({ sex }) => sex === 'f');
  const length = filteredPeople.length;

  return ((filteredPeople
    .reduce((sumAges, { born, died }) => sumAges + (died - born), 0)) / length
  );
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
  const filteredPeople = onlyWithSon
    ? people.filter(({ sex, mother }) => (
      people.find(({ name }) => mother === name)) && sex === 'm')
    : people.filter(({ mother }) => (
      people.find(({ name }) => mother === name)));
  const length = filteredPeople.length;

  return ((filteredPeople.reduce((sumAges, { born, mother }) => (
    sumAges + born - people.find(({ name }) => mother === name).born), 0))
    / length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
