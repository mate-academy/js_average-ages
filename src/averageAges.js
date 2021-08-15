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
  const mans = people.filter(({ sex }) => (sex === 'm'));

  const sameCentury = mans.filter(({ died }) => (
    Math.ceil(died / 100) === century
  ));

  const isCentury = (typeof century) === 'number' ? sameCentury : mans;

  const manAge = isCentury.map(({ died, born }) => {
    return died - born;
  });

  return manAge.reduce((a, b) => a + b) / manAge.length;
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
  const womenAll = people.filter(({ sex }) => sex === 'f');

  const withChild = womenAll.filter(({ name }) => (
    people.some(({ mother }) => name === mother)
  ));

  const women = withChildren ? withChild : womenAll;

  const womenAge = women.map(({ died, born }) => {
    return died - born;
  });

  return womenAge.reduce((a, b) => a + b) / womenAge.length;
}

calculateWomenAverageAge(require('./people', true));

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
  const onlyChildren = people.filter(({ mother }) => (
    people.some(({ name }) => name === mother)
  ));

  // console.log(onlyChildren);

  const sons = onlyChildren.filter(({ sex }) => sex === 'm');

  const withChildren = onlyWithSon ? sons : onlyChildren;

  const difference = withChildren.map(
    b => b.born - people.find(
      human => human.name === b.mother
    ).born
  );

  return difference.reduce((a, b) => a + b) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
