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
  const allMaleList = people.filter(person => person.sex === 'm');
  let maleList;

  century === undefined
    ? maleList = allMaleList
    : maleList = allMaleList
      .filter(person => Math.ceil(person.died / 100) === century);

  const allMaleAge = maleList.map((person) => person.died - person.born);
  const maleAverage
    = allMaleAge.reduce((acc, curr) => acc + curr, 0) / allMaleAge.length;

  return maleAverage;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const allFemaleList = people.filter(person => person.sex === 'f');
  let femaleList;

  withChildren
    ? femaleList = allFemaleList
      .filter(mother => people.some(person => person.mother === mother.name))
    : femaleList = allFemaleList;

  const allFemaleAge = femaleList.map((person) => person.died - person.born);
  const femaleAverage
    = allFemaleAge.reduce((acc, curr) => acc + curr, 0) / allFemaleAge.length;

  return femaleAverage;
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
  const children = people
    .filter(child => people
      .some(mother => child.mother === mother.name));

  let childrenList;

  onlyWithSon
    ? childrenList = children.filter(person => person.sex === 'm')
    : childrenList = children;

  const ageDifference = childrenList
    .map(child => child.born - people
      .find(mother => child.mother === mother.name).born);
  const ageDifferenceAverage = ageDifference
    .reduce((acc, curr) => acc + curr, 0) / ageDifference.length;

  return ageDifferenceAverage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
