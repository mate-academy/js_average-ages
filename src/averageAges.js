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
  let filtered = people.filter(el => el.sex === 'm');

  if (arguments.length > 1) {
    filtered = people
      .filter(el => Math.ceil(el.died / 100) === century && el.sex === 'm');
  }

  const average = filtered
    .reduce((sum, el) => sum + (el.died - el.born), 0) / filtered.length;

  return average;
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
  let women = people.filter(el => el.sex === 'f');

  if (arguments.length > 1) {
    const motherNames = people.map(el => el.mother);

    women = people
      .filter(el => motherNames.includes(el.name));
  }

  const average = women
    .reduce((sum, el) => sum + (el.died - el.born), 0) / women.length;

  return average;
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
  const children = people.filter(el => onlyWithSon
    ? people.some(
      child => el.mother === child.name) && el.sex === 'm'
    : people.some(child => el.mother === child.name)
  );

  const average = children.reduce(
    (sum, el) => sum + (el.born - people.find(
      mother => el.mother === mother.name).born), 0) / children.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
