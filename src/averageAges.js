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
  const man = people.filter((person) => person.sex === 'm');

  // if we have century => filter by century, else => man array.
  const isCentury = century
    ? man.filter((person) => Math.ceil(person.died / 100) === century)
    : man;

  const manAge = isCentury.map((person) => person.died - person.born);
  const averageAge = manAge.reduce((prev, curr) => prev + curr) / manAge.length;

  return averageAge;
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
  // find women
  const women = people.filter((person) => person.sex === 'f');

  // find women with Children
  const womenWithChildren = people.filter((woman) => {
    return people.find((child) => woman.name === child.mother);
  });

  const isWithChildren = withChildren ? womenWithChildren : women;

  const womenAge = isWithChildren.map((person) => person.died - person.born);
  const averageAge = womenAge
    .reduce((prev, curr) => prev + curr) / womenAge.length;

  return averageAge;
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
  // find women with kids
  const womenWithChildren = people.filter((child) => {
    return people.find((woman) => woman.name === child.mother);
  });

  // find kids only if kids.sex === 'm'
  const childrenOnlyMens = people.filter((child) => {
    return (
      people.find((woman) => woman.name === child.mother) && child.sex === 'm'
    );
  });

  const isOnlyWithSon = onlyWithSon ? childrenOnlyMens : womenWithChildren;

  const ageDifferences = isOnlyWithSon.map((child) => {
    return (
      child.born - people.find((woman) => woman.name === child.mother).born
    );
  });
  const averageAgeDifference = ageDifferences
    .reduce((prev, curr) => prev + curr) / ageDifferences.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
