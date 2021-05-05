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
  const averageAge = people
    .filter(person => person.sex === 'm')
    .filter(man => !century || Math.ceil(man.died / 100) === century)
    .map(man => (man.died - man.born));

  return averageAge.reduce((a, b) => a + b) / averageAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const averageAge = people
    .filter(person => person.sex === 'f')
    .filter(woman => !withChildren || getChildren(people, woman).length > 0)
    .map(woman => (woman.died - woman.born));

  return averageAge.reduce((a, b) => a + b) / averageAge.length;
}

function getChildren(people, person) {
  return people.filter(child => child.mother === person.name);
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
  const child = people.filter(person => (onlyWithSon)
    ? people.some(mother => mother.name === person.mother) && person.sex === 'm'
    : people.some(mother => mother.name === person.mother));

  const averageAgeDiff = child.map(person =>
    (person.born - people.find(mother => mother.name === person.mother).born));

  return averageAgeDiff.reduce((a, b) => a + b) / averageAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
