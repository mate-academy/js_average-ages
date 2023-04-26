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

const filterBySex = (people, filterSex) =>
  people.filter(({ sex }) => sex === filterSex);

const averageYears = (peopleBySex) =>
  peopleBySex.map(el =>
    el.died - el.born).reduce((acc, val) =>
    acc + val, 0) / peopleBySex.length;

const averageYearsChildren = (people, peopleBySex) =>
  peopleBySex.map(el =>
    el.born - people.find(mother =>
      el.mother === mother.name).born).reduce((acc, val) =>
    acc + val, 0) / peopleBySex.length;

function calculateMenAverageAge(people, century) {
  const men = filterBySex(people, 'm');
  const menAverageYears = averageYears(men);
  const menWithCentury = men.filter(el => Math.ceil(el.died / 100) === century);
  const averageWithCentury = averageYears(menWithCentury);

  return century ? averageWithCentury : menAverageYears;
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
  const women = filterBySex(people, 'f');
  const womenAverageYears = averageYears(women);

  const womenWithChildren = women.filter(
    el => people.some(mother => el.name === mother.mother)
  );
  const womenWithChildrenYears = averageYears(womenWithChildren);

  return withChildren ? womenWithChildrenYears : womenAverageYears;
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
  const children = people.filter(
    el => people.find(mother => el.mother === mother.name)
  );

  const childrenOnlySons = filterBySex(children, 'm');
  const ageDifference = averageYearsChildren(people, children);
  const sonDifference = averageYearsChildren(people, childrenOnlySons);

  return onlyWithSon ? sonDifference : ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
