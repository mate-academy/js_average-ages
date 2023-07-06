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
function getAverageDiff(diffs) {
  const diffsSum = diffs.reduce((a, b) => a + b);

  return diffsSum / diffs.length;
}

function calculateMenAverageAge(people, century) {
  let men;

  century
    ? men = people
      .filter((p) => (p.sex === 'm' && Math.ceil(p.died / 100) === century))
    : men = people
      .filter((p) => (p.sex === 'm'));

  const diffs = men.map((man) => man.died - man.born);

  return getAverageDiff(diffs);
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
  let women;

  const mothers = people.map((p) => p.mother)
    .filter((mother) => mother !== null);

  withChildren
    ? women = people.filter((p) => (p.sex === 'f'))
      .filter((woman) => mothers.includes(woman.name))
    : women = people.filter((p) => (p.sex === 'f'));

  const diffs = women.map((woman) => woman.died - woman.born);

  return getAverageDiff(diffs);
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
  let children;

  const sons = people
    .filter((p) => p.sex === 'm' && p.mother !== null);

  onlyWithSon
    ? children = sons
    : children = people.filter((p) => p.mother !== null);

  const getAgeDiff = function(child) {
    const childMother = people.find((p) => p.name === child.mother);

    let diff;

    childMother
      ? diff = child.born - childMother.born
      : diff = null;

    return diff;
  };

  const diffs = children.map(getAgeDiff)
    .filter((diff) => diff !== null);

  return getAverageDiff(diffs);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
