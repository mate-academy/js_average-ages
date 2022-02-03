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
  let men = people
    .filter((i) => i.sex === 'm')
    .map((person) => person.died - person.born);

  if (century !== undefined) {
    men = people
      .filter((i) => i.sex === 'm' && century === Math.ceil(i.died / 100))
      .map((person) => person.died - person.born);
  }

  const avrageManAge = men.reduce((a, b) => (a + b)) / men.length;

  return +avrageManAge.toFixed(2);
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
  let women = people
    .filter(person => person.sex === 'f')
    .map(i => i.died - i.born);

  if (withChildren !== undefined) {
    women = people
      .filter((person) => person.sex === 'f')
      .filter((i) => people.find((child) => child.mother === i.name))
      .map((i) => i.died - i.born);
  }

  const avrageWomenAge = women
    .reduce((a, b) => a + b) / women.length;

  return +avrageWomenAge.toFixed(2);
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
  const children = people.filter(child => {
    return onlyWithSon
      ? people.some(person => person.name === child.mother && child.sex === 'm')
      : people.some(person => person.name === child.mother);
  });

  const childWithWomenDiff = children.map(child => {
    return child.born - people
      .find(person => person.name === child.mother).born;
  });

  return childWithWomenDiff.reduce((a, b) => a + b) / childWithWomenDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
