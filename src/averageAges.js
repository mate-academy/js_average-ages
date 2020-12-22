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
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  return men.reduce((sum, y) => sum + (y.died - y.born), 0) / men.length;
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
  const children = people.filter(person =>
    person.mother !== null);
  const mothers = children.map(child => child.mother);

  const women = people.filter(person =>
    withChildren
      ? person.sex === 'f' && mothers.includes(person.name)
      : person.sex === 'f');

  return women.reduce((sum, y) => sum + (y.died - y.born), 0) / women.length;
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
    onlyWithSon
      ? people.some(mother => person.mother === mother.name)
        && person.sex === 'm'
      : people.some(mother => person.mother === mother.name));

  const ageDiff = children.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born);

  return ageDiff.reduce((sum, diff) => sum + diff) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
