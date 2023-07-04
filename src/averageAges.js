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
  let men = people.filter((p) => (p.sex === 'm'));

  if (century) {
    men = men.filter((man) => (Math.ceil(man.died / 100) === century));
  }

  const ageSum = men.map((man) => man.died - man.born)
    .reduce((a, b) => a + b);

  return ageSum / men.length;
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
  let women = people.filter((p) => (p.sex === 'f'));

  if (withChildren) {
    const mothers = people.map((p) => p.mother)
      .filter((mother) => mother !== null);

    women = women.filter((woman) => mothers.includes(woman.name));
  }

  const ageSum = women.map((woman) => woman.died - woman.born)
    .reduce((a, b) => a + b);

  return ageSum / women.length;
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
  const sons = people
    .filter((p) => p.sex === 'm' && p.mother !== null);

  let children = people.filter((p) => p.mother !== null);

  if (onlyWithSon) {
    children = sons;
  }

  const getAgeDiff = function(child) {
    const childMother = people.find((p) => p.name === child.mother);

    if (!childMother) {
      return null;
    }

    return child.born - childMother.born;
  };

  const diffs = children.map(getAgeDiff)
    .filter((diff) => diff !== null);

  const diffsSum = diffs.reduce((a, b) => a + b);

  return diffsSum / diffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
