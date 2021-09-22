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
  let menFiltered = people.filter(i => i.sex === 'm');

  menFiltered = century
    ? menFiltered.filter(person => Math.ceil(person.died / 100) === century)
    : menFiltered;

  const menAges = menFiltered.map((person) => person.died - person.born);
  const averageAgeMen = menAges.reduce((sum, x) => sum + x, 0) / menAges.length;

  return +averageAgeMen.toFixed(2);
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
  let womenFiltered = people.filter(i => i.sex === 'f');

  womenFiltered = withChildren
    ? womenFiltered.filter(woman =>
      (people.some(person => person.mother === woman.name)))
    : womenFiltered;

  const womenAges = womenFiltered.map((person) => person.died - person.born);
  const averageAgeWomen = womenAges.reduce((sum, x) =>
    sum + x, 0) / womenAges.length;

  return +averageAgeWomen.toFixed(2);
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
  let children = people.filter(person =>
    (people.some(woman => woman.name === person.mother)));

  children = onlyWithSon
    ? children.filter(person =>
      person.sex === 'm')
    : children;

  const ageDifference = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);
  const averageAgeDifference = ageDifference.reduce((sum, x) =>
    sum + x, 0) / ageDifference.length;

  return +averageAgeDifference.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
