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
  const menInCentry = century
    ? men.filter(
      person => Math.ceil(person.died / 100) === century
    )
    : men;

  const averageAge = menInCentry.reduce(
    (sum, age) => sum + (age.died - age.born),
    0
  ) / menInCentry.length;

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
  const women = people.filter(person => person.sex === 'f');

  const womenWithChild = withChildren
    ? people.filter(
      person => people.some(
        child => child.mother === person.name
      )
    )
    : women;

  const averageAge = womenWithChild.reduce(
    (sum, age) => sum + (age.died - age.born),
    0
  ) / womenWithChild.length;

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
  const child = people
    .filter(children => people.some(person => children.mother === person.name));

  const childIsSon = onlyWithSon
    ? child.filter(
      person => person.sex === 'm'
    )
    : child;

  const averageAgeDiff = childIsSon.reduce(
    (sum, children) => sum + (
      children.born - people.find(
        mom => children.mother === mom.name).born),
    0)
    / childIsSon.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
