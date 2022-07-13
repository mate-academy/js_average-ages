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
  const men = people.filter(person => (century)
    ? person.sex === 'm'
      && Math.ceil(person.died / 100) === century
    : person.sex === 'm',
  );

  return men.reduce((prev, curr) => (
    prev + curr.died - curr.born
  ), 0) / men.length;
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
  let women = people.filter((woman) => woman.sex === 'f');

  women = withChildren
    ? women.filter(woman => people.some(human => human.mother === woman.name))
    : women;

  return women.reduce((prev, curr) => (
    prev + curr.died - curr.born
  ), 0) / women.length;
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
  const childrens = people.filter(child => child.mother
    && people.find(mother => child.mother === mother.name)
      && (onlyWithSon
        ? child.sex === 'm'
        : true));

  return childrens.reduce((prev, curr) => (
    prev + Math.abs(curr.born - people.find(human => (
      human.name === curr.mother
    )).born)
  ), 0) / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
