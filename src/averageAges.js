'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death  by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const menForReduce = century
    ? men.filter(person => Math.ceil(person.died / 100) === century) : men;

  return menForReduce
    .reduce((a, b, i, array) => a + (b.died - b.born) / array.length, 0);
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
  const woman = people.filter(elem => elem.sex === 'f');

  const womanForReduce = withChildren
    ? woman.filter(mother => people.some(child => child.mother === mother.name))
    : woman;

  return womanForReduce
    .reduce((a, b, i, array) => a + (b.died - b.born) / array.length, 0);
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
  const children = people
    .filter(person => people
      .some(mother => person.mother === mother.name));

  const onlySon = onlyWithSon
    ? children.filter(child => child.sex === 'm') : children;

  const ageOfMathers = onlySon
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  return ageOfMathers.reduce((a, b) => a + b) / ageOfMathers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
