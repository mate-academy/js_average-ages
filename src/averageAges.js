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
  const menAverageAges = (arguments.length > 1)
    ? people
      .filter((p) => p.sex === 'm' && Math.ceil(p.died / 100) === century)
      .map((p) => p.died - p.born)
    : people
      .filter((p) => p.sex === 'm')
      .map((p) => p.died - p.born);

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
  const womenAverageAgeWithChildren = (arguments.length > 1)
    ? people
      .filter((p) => p.sex === 'f' && people.find((w) => p.name === w.mother))
      .map((p) => p.died - p.born)
    : people
      .filter((p) => p.sex === 'f')
      .map((p) => p.died - p.born);

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

  const women = people
    .filter((p) => p.sex === 'f')
    .filter((p) => people.find((w) => p.name === w.mother));

  averageDiffOnlyWithSon = people
    .filter((p) => women.find((ch) => p.mother === ch.name))
    .filter((p) => p.sex === 'm')
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
