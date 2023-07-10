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

function peopleAgesFunc(people, isGender) {
  return people.filter((p) => isGender(p)).map((p) => p.died - p.born);
}

function calculateMenAverageAge(people, century) {
  const MAN = 'm';
  const YEARS_IN_CENTURY = 100;
  const isMan = (p) => p.sex === MAN;
  const menAverageAges = (arguments.length > 1)
    ? people
      .filter(
        (p) => isMan(p) && Math.ceil(p.died / YEARS_IN_CENTURY) === century
      )
      .map((p) => p.died - p.born)
    : peopleAgesFunc(people, isMan);

  return +(menAverageAges.reduce(
    (prev, item) => prev + item
  ) / menAverageAges.length).toFixed(2);
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
  const WOMAN = 'f';
  const isWoman = (p) => p.sex === WOMAN;
  const womenAverageAgeWithChildren = (arguments.length > 1)
    ? people
      .filter((p) => isWoman(p) && people.find((w) => p.name === w.mother))
      .map((p) => p.died - p.born)
    : peopleAgesFunc(people, isWoman);

  return +(womenAverageAgeWithChildren.reduce(
    (prev, item) => prev + item
  ) / womenAverageAgeWithChildren.length).toFixed(2);
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
  let averageDiff = 0;
  let averageDiffOnlyWithSon = 0;
  const isWoman = (p) => p.sex === 'f';
  const isMan = (p) => p.sex === 'm';

  const women = people
    .filter(isWoman)
    .filter((p) => people.find((w) => p.name === w.mother));

  averageDiffOnlyWithSon = people
    .filter((p) => women.find((ch) => p.mother === ch.name))
    .filter(isMan)
    .map((ch) => ch.born - women.find(
      (m) => m.name === ch.mother
    ).born);

  averageDiff = people
    .filter((p) => women.find((ch) => p.mother === ch.name))
    .map((ch) => ch.born - women.find(
      (m) => m.name === ch.mother
    ).born);

  return (onlyWithSon)
    ? +(averageDiffOnlyWithSon.reduce(
      (prev, item) => prev + item
    ) / averageDiffOnlyWithSon.length).toFixed(2)
    : +(averageDiff.reduce(
      (prev, item) => prev + item
    ) / averageDiff.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
