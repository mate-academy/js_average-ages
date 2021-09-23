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
  let menFiltered = people.filter(person => person.sex === 'm');

  if (century) {
    menFiltered = menFiltered
      .filter(person => Math.ceil(person.died / 100) === century);
  }

  const averageAgeMen = menFiltered.map((person) =>
    person.died - person.born).reduce((sum, x) =>
    sum + x, 0) / menFiltered.length;

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

  // womenFiltered = withChildren
  //   ? womenFiltered.filter(woman =>
  //     (people.some(person => person.mother === woman.name)))
  //   : womenFiltered;

  if (withChildren) {
    womenFiltered = womenFiltered.filter(woman =>
      (people.some(person => person.mother === woman.name)));
  }

  const averageAgeWomen = womenFiltered.map((person) =>
    person.died - person.born).reduce((sum, x) =>
    sum + x, 0) / womenFiltered.length;

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

  if (onlyWithSon) {
    children = children.filter(person =>
      person.sex === 'm');
  }

  const averageAgeDifference = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born)
    .reduce((sum, x) => sum + x, 0) / children.length;

  return +averageAgeDifference.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
