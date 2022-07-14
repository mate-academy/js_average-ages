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
  const man = people.filter(person => person.sex === 'm');
  const manAges = century
    ? man.filter(men => Math.ceil(men.died / 100) === century).map(calculateAge)
    : man.map(calculateAge);
  const calculateAverage = manAges.reduce((sum, x) => sum + x);

  return calculateAverage / manAges.length;
}

function calculateAge(person) {
  return person.died - person.born;
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
  const women = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.find(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const womenAges = women.map(calculateAge);

  const calculateAverage = womenAges.reduce((sum, x) => sum + x);

  return calculateAverage / womenAges.length;
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
  const withChildren = (onlyWithSon
    ? people.filter(person =>
      person.sex === 'm'
      && people.find(mother => person.mother === mother.name))
    : people.filter(person =>
      people.find(mother => person.mother === mother.name)));

  return withChildren.reduce((sum, person) =>
    sum + person.born - people.find(mother =>
      person.mother === mother.name).born, 0)
    / withChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
