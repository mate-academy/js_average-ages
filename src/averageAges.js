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
function calculateSumAge(sex) {
  const sumAge = sex.reduce((sum, { died, born }) => (
    sum + died - born
  ), 0);

  return sumAge;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  const calculateSumMenAge = calculateSumAge(men);

  return calculateSumMenAge / men.length;
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
  const women = people.filter(woman => (
    withChildren
      ? woman.sex === 'f'
      && people.some(person => person.mother === woman.name)
      : woman.sex === 'f'
  ));

  const calculateSumWomenAge = calculateSumAge(women);

  return calculateSumWomenAge / women.length;
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
  const children = people.filter(child => (
    onlyWithSon
      ? child.sex === 'm'
      && people.some(mom => child.mother === mom.name)
      : people.some(mom => child.mother === mom.name)
  ));

  const calculateAverageAgeDifference = children.reduce((sum, child) => {
    const childMother = people.find(mother => mother.name === child.mother);

    return sum + child.born - childMother.born;
  }, 0);

  return calculateAverageAgeDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
