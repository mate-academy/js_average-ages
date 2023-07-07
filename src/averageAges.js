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
  const menFilterAges = people.filter((person) => ((person.sex === 'm')
      && (century ? Math.ceil(person.died / 100) === century : true)));

  return menFilterAges.reduce((sum, person) =>
    sum + person.died - person.born, 0) / menFilterAges.length;
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
  const womenFilterAges = people.filter(person =>
    withChildren
      ? people.find(child => child.mother === person.name) && person.sex === 'f'
      : person.sex === 'f'
  );

  return womenFilterAges.reduce((sum, person) => sum
    + person.died - person.born, 0) / womenFilterAges.length;
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
  const motherWithSon = people.filter(child =>
    onlyWithSon
      ? people.find(woman => child.mother === woman.name) && child.sex === 'm'
      : people.find(woman => child.mother === woman.name)
  );

  return motherWithSon.reduce((sum, child) => sum
  + child.born - people.find((woman) =>
    child.mother === woman.name).born, 0) / motherWithSon.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
