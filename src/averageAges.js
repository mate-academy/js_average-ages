'use strict';

// const { includes } = require('./people');

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of woman's death by 100: Math.ceil(woman.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  let men;

  (century === undefined)
    ? men = people.filter(man => man.sex === 'm')
    : men = people.filter(man => Math.floor(man.died / 100) === century - 1
    && man.sex === 'm');

  const average = men.reduce((sum, man) =>
    sum + (man.died - man.born), 0) / men.length;

  return average;
}
/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  let women;
  const children = people.filter(child => child.mother !== null);
  const mothersNames = Array.from(new Set(Array.from(
    children, child => child.mother)));

  (withChildren === undefined)
    ? women = people.filter(woman => woman.sex === 'f')
    : women = people.filter(person => mothersNames.includes(person.name));

  const average = women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0) / women.length;

  return average;
}

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
  const mothers = people.filter(woman => woman.sex === 'f'
    && people.some(person => woman.name === person.mother));

  const children = people.filter(person =>
    (onlyWithSon ? person.sex === 'm' : person)
    && mothers.some(mom => person.mother === mom.name));

  const deltaAge = children.map(child => mothers.map(mom => {
    return child.mother === mom.name ? child.born - mom.born : null;
  }).filter(item => item !== null));

  return deltaAge.reduce((sum, elem) => sum + elem[0], 0) / deltaAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
