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
  const men = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');
  const ageOfMen = men
    .map(({ born, died }) => died - born);

  return findAverage(ageOfMen);
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
  const women = withChildren
    ? people.filter(woman => woman.sex === 'f' && people
      .some(person => person.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');
  const ageOfWomen = women.map(({ born, died }) => died - born);

  return findAverage(ageOfWomen);
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
  const childrenByGenderWithMothers = onlyWithSon
    ? people
      .filter(person => people
        .some(parent => parent
          .name === person.mother)
        && person.sex === 'm')
    : people
      .filter(person => people
        .some(parent => parent
          .name === person.mother));
  const diffWithMothersAge = childrenByGenderWithMothers
    .map(child => child.born
    - (people.find(parent => parent.name === child.mother)).born);

  return findAverage(diffWithMothersAge);
}

function findAverage(arr) {
  return arr
    .reduce((previousValue, current) => previousValue + current, 0)
    / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
