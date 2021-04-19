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
  const men = people.filter(person =>
    person.sex === 'm'
    && (!century || century === Math.ceil(person.died / 100)));

  return men.reduce((acc, value) =>
    acc + value.died - value.born, 0) / men.length;
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
  const womans = people.filter(person =>
    person.sex === 'f'
    && (!withChildren || people.find(el => el.mother === person.name)));

  return (womans.reduce((acc, value) =>
    acc + value.died - value.born, 0) / womans.length);
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
  const children = people.filter(person =>
    person.mother && ((onlyWithSon && person.sex === 'm') || (!onlyWithSon))
    && people.find(mom => person.mother === mom.name));

  const ageDiff = children.map(child =>
    child.born - people.find(person => child.mother === person.name).born);

  return (ageDiff.reduce((acc, value) => acc + value) / ageDiff.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
