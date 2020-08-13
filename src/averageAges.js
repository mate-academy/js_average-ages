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
  const men = people.filter(person => person.sex === 'm');
  let menToCount;

  (century !== undefined)
    ? menToCount = men.filter(person =>
      (Math.ceil(person.died / 100)) === century)
    : menToCount = men;

  const agesToCount = menToCount.map(person => (person.died - person.born))
    .reduce((a, b) => a + b);

  return agesToCount / (menToCount.length);
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
  const mothers = people.map(person => person.mother);
  const women = people.filter(person => person.sex === 'f');
  let womenToCount;

  (withChildren !== undefined)
    ? womenToCount = women.filter(person =>
      (mothers.includes(person.name)))
    : womenToCount = women;

  const agesToCount = womenToCount.map(person => (person.died - person.born))
    .reduce((a, b) => a + b);

  return agesToCount / (womenToCount.length);
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
  const agesToCount = [];

  (onlyWithSon)
    ? people.forEach(woman => people.map(person => {
      if (person.mother === woman.name && person.sex === 'm') {
        agesToCount.push(person.born - woman.born);
      }
    }))
    : people.forEach(woman => people.map(person => {
      if (person.mother === woman.name) {
        agesToCount.push(person.born - woman.born);
      }
    }));

  return agesToCount.reduce((a, b) => a + b) / agesToCount.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
