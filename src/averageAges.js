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
const yearsDifference = el => el.died - el.born;
const totalYears = (acc, val) => acc + val;
const findMen = el => el.sex === 'm';

function calculateMenAverageAge(people, century) {
  const men = people.filter(findMen);

  const averageYears = men.map(yearsDifference);
  const averageAll = averageYears.reduce(totalYears, 0) / men.length;

  const menWithCentury = men.filter(el => Math.ceil(el.died / 100) === century);
  const averageWithCentury = menWithCentury.map(yearsDifference);

  const averageCountWithCentury = averageWithCentury.reduce(
    totalYears, 0) / menWithCentury.length;

  return century ? averageCountWithCentury : averageAll;
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
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(el => el.sex === 'f');

  const averageYears = women.map(yearsDifference);
  const averageAll = averageYears.reduce(totalYears, 0) / women.length;

  const womenWithChildren = women.filter(
    el => people.some(mother => el.name === mother.mother)
  );

  const womenWithChildrenYears = womenWithChildren.map(yearsDifference);
  const womenWithChildrenAverageYears = womenWithChildrenYears.reduce(
    totalYears, 0) / womenWithChildren.length;

  return withChildren ? womenWithChildrenAverageYears : averageAll;
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
  const findChildrenAgeDifference = el =>
    el.born - people.find(mother => el.mother === mother.name).born;

  const children = people.filter(
    el => people.find(mother => el.mother === mother.name)
  );

  const childrenOnlySons = children.filter(findMen);
  const ageDifference = children.map(findChildrenAgeDifference);

  const averageAgeDifference = ageDifference.reduce(
    totalYears, 0) / ageDifference.length;

  const sonDifference = childrenOnlySons.map(findChildrenAgeDifference);

  const averageDifferenseWithSon = sonDifference.reduce(
    totalYears, 0) / sonDifference.length;

  return onlyWithSon ? averageDifferenseWithSon : averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
