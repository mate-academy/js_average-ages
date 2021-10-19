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
  const man = people.filter(person =>
    century ? person.sex === 'm'
    && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  return man.reduce((arr, curr) =>
    arr + (curr.died - curr.born), 0) / man.length;
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
  const woman = people.filter(person =>
    withChildren ? person.sex === 'f'
    && people.some(child => child.mother === person.name)
      : person.sex === 'f');

  return woman.reduce((arr, curr) =>
    arr + (curr.died - curr.born), 0) / woman.length;
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
  const children = people.filter(person => onlyWithSon
    ? person.mother && person.sex === 'm'
    : person.mother);

  const mothers = people.filter(person =>
    people.some(child => child.mother === person.name));

  const childMother = children.filter(child =>
    mothers.some(mother => child.mother === mother.name));

  const averageAge = childMother.reduce(
    (sum, curr) => sum + (curr.born - people.find(mother =>
      curr.mother === mother.name).born), 0) / childMother.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
