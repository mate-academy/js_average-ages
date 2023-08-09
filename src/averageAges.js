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

const isObject = (value) => typeof value === 'object' && value !== null;

const getAverageAge = people => isObject(people[0])

  ? people.reduce((acc, { born, died }) =>
    acc + (died - born), 0) / people.length || 0

  : people.reduce((total, value) => total + value, 0);

function calculateMenAverageAge(people, century) {
  const men = people.filter(({ sex, died }) =>
    sex === 'm' && (century ? Math.ceil(died / 100) === century : true));

  return getAverageAge(men);
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
  const women = people.filter(({ name, sex }) =>
    sex === 'f' && (withChildren ? people.some(({ mother }) =>
      mother === name) : true));

  return getAverageAge(women);
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
  const children = people.filter(({ mother, sex }) =>
    mother && ((onlyWithSon && sex === 'm') || (!onlyWithSon))
      && people.find(mom => mother === mom.name));

  const ageDiff = children.map(({ mother: childMother, born }) =>
    born - people.find(({ name }) => childMother === name).born);

  return getAverageAge(ageDiff) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
