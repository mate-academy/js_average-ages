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
  const men = people.filter(person => century !== undefined
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  const menAvg = men
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / men.length;

  return +menAvg.toFixed(2);
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
  const women = people.filter(person => withChildren !== undefined
    ? people.some(name => person.name === name.mother)
    : person.sex === 'f');

  const avg = women
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / women.length;

  return +avg.toFixed(2);
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
  const mothers = people
    .filter(person => people.some(child => child.mother === person.name));
  const children = people
    .filter(child => onlyWithSon !== undefined
      ? mothers
        .find(mother => mother.name === child.mother) && child.sex === 'm'
      : mothers.find(mother => mother.name === child.mother));

  const ageDiff = children
    .map(child => child.born - (mothers
      .find(mother => child.mother === mother.name)).born)
    .reduce((a, b) => a + b) / children.length;

  return +ageDiff.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
