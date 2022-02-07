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
  const menAge = people.filter(person => {
    return century
      ? (person.sex === 'm' && century === Math.ceil(person.died / 100))
      : (person.sex === 'm');
  }).map(men => men.died - men.born);

  const avrageManAge = menAge.reduce((a, b) => (a + b)) / menAge.length;

  return +avrageManAge.toFixed(2);
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
  const womenAge = people.filter(person => {
    return withChildren
      ? people.some(child => child.mother === person.name)
      : person.sex === 'f';
  }).map((women) => women.died - women.born);

  const avrageWomenAge = womenAge
    .reduce((a, b) => a + b) / womenAge.length;

  return +avrageWomenAge.toFixed(2);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between
 * a mother
 * her child
 * difference between(A mother's age at child birth)
 *
 * a mother
 * her child - (son)
 * difference between(A mother's age at child birth)
 *
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
