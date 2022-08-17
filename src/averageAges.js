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
  const filterMen = people.filter(({ sex, died }) => {
    return sex === 'm' && (
      century ? Math.ceil(died / 100) === century
        : true);
  });

  return filterMen.reduce((sum, { died, born }) => (
    sum + (died - born)), 0) / filterMen.length;
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
  const filterWomen = people.filter(({ sex, name }) => {
    return sex === 'f' && (
      withChildren
        ? people.some(child => child.mother === name)
        : true
    );
  });

  return filterWomen.reduce((sum, { died, born }) => (
    sum + (died - born)), 0) / filterWomen.length;
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
  const filterDifferents = people.filter(({ mother, sex }) => {
    return people.some(({ name }) => mother === name)
      && (onlyWithSon ? sex === 'm' : true);
  });

  return filterDifferents.reduce((sum, { born, mother }) => (
    sum + born - people.find(person => (
      mother === person.name)).born), 0) / filterDifferents.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
