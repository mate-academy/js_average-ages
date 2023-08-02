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
    ? people.filter(person => person.sex
      === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  if (men.length === 0) {
    return 0;
  }

  const totalAge = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const averageAge = totalAge / men.length;

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
  const women = withChildren
    ? people.filter(person => person.sex
      === 'f' && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  if (women.length === 0) {
    return 0;
  }

  const totalAge = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const averageAge = totalAge / women.length;

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
  const childrenWithMothers = onlyWithSon
    ? people.filter(person => person.sex === 'm' && people
      .some(mother => mother.name === person.mother))
    : people.filter(person => people.some(mother =>
      mother.name === person.mother));

  if (childrenWithMothers.length === 0) {
    return 0;
  }

  const ageDifferences = childrenWithMothers.map(child => child.born
    - people.find(mother => mother.name === child.mother).born);

  const totalAgeDifference
  = ageDifferences.reduce((sum, ageDiff) => sum + ageDiff, 0);

  const averageAgeDiff = totalAgeDifference / childrenWithMothers.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
