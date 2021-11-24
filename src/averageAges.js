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
  const men = people.filter(
    person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  const aveAgeMen = men
    .map(person => person.died - person.born)
    .reduce((sum, currentAge) => sum + currentAge) / men.length;

  return aveAgeMen;
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
  const women = withChildren
    ? people.filter(
      person => person.sex === 'f'
      && people.some(child => child.mother === person.name)
    )
    : people.filter(person => person.sex === 'f');

  const aveAgeWomen = women
    .map(woman => woman.died - woman.born)
    .reduce((sum, currentAge) => sum + currentAge) / women.length;

  return aveAgeWomen;
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
  const children = onlyWithSon
    ? people.filter(
      person => person.sex === 'm'
      && people.some(mother => mother.name === person.mother)
    )
    : people.filter(
      person => people.some(mother => mother.name === person.mother)
    );

  const aveAgeDiff = children
    .map(
      child => child.born - people.find(mom => mom.name === child.mother).born
    )
    .reduce((prev, curr) => prev + curr) / children.length;

  return aveAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
