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
  const men = people
    .filter(person => person.sex === 'm'
    && (century
      ? Math.ceil(person.died / 100) === century
      : true));

  const agesOfMen = men.map(man => man.died - man.born);

  return getAverageAge(agesOfMen);
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
  const women = people.filter(person => person.sex === 'f' && (withChildren
    ? people.find(child => child.mother === person.name)
    : true));

  const agesOfWomen = women.map(woman => woman.died - woman.born);

  return getAverageAge(agesOfWomen);
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
  const children = people
    .filter(person => people
      .some(woman => woman.name === person.mother) && (onlyWithSon
      ? person.sex === 'm'
      : true));

  const ageDifferences = children
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  return getAverageAge(ageDifferences);
}

function getAverageAge(ages) {
  const sumOfAges = ages.reduce((a, b) => (a + b), 0);

  return ages
    ? sumOfAges / ages.length
    : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
