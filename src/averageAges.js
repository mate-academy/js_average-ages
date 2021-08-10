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
  const menArray = people.filter(person => person.sex === 'm');

  const menRangeArray = !century
    ? menArray
    : menArray.filter(man => Math.ceil(man.died / 100) === century);

  const menAgesArray = menRangeArray.map(man => man.died - man.born);

  const menAgeSum = menAgesArray.reduce((sum, age) => sum + age, 0);

  return menAgeSum / menAgesArray.length;
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
  const womenArray = people.filter(person => person.sex === 'f');

  const womenAndChildren = !withChildren
    ? womenArray
    : womenArray.filter((woman) => people.some(
      person => person.mother === woman.name));

  const womenAgesArray = womenAndChildren.map(woman => woman.died - woman.born);

  const womenAgeSum = womenAgesArray.reduce((sum, age) => sum + age, 0);

  return womenAgeSum / womenAgesArray.length;
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
  const allChildrenArray = people.filter(
    person => people.some(mother => mother.name === person.mother));

  const onlySonsArray = allChildrenArray.filter(child => child.sex === 'm');

  const childrenArray = !onlyWithSon ? allChildrenArray : onlySonsArray;

  const agesDiffArray = childrenArray.map(
    child => child.born - people.find(
      mother => mother.name === child.mother).born);

  const ageDiffSum = agesDiffArray.reduce(
    (sum, diffAge) => sum + diffAge,
    0,
  );

  return ageDiffSum / childrenArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
