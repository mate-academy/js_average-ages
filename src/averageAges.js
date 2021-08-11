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
  const man = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  return man.reduce((ageSum, { born, died }) =>
    ageSum + (died - born), 0) / man.length;
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
  const women = people.filter(person => person.sex === 'f');
  const womanWithChildren = withChildren
    ? women.filter((woman) => people.some(person =>
      person.mother === woman.name))
    : women;

  return womanWithChildren.length === 0
    ? undefined
    : womanWithChildren.reduce((ageSum, person) =>
      ageSum + (person.died - person.born), 0) / womanWithChildren.length;
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
  let kids = people.filter(kid => people.some(person =>
    kid.mother === person.name));

  kids = onlyWithSon
    ? kids.filter(person => person.sex === 'm')
    : kids;

  const ageDifference = kids.map(
    kid => kid.born - people.find(
      person => person.name === kid.mother).born);

  return ageDifference.reduce(
    (sum, age) => sum + age,
    0,
  ) / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
