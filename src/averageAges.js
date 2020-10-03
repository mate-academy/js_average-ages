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
  const men = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  const ages = men.reduce((sum, man) =>
    sum + (man.died - man.born), 0);

  return ages / men.length;
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
  const women = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : person.sex === 'f');

  const ages = women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);

  return ages / women.length;
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
    ? people.some(child => child.name === person.mother && person.sex === 'm')
    : people.some(child => child.name === person.mother));

  const ages = children.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born
  );

  return ages.reduce((sum, age) => sum + age) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
