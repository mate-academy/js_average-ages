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
function averageAge(arr) {
  return arr.reduce((sum, { born, died }) => sum + died - born, 0) / arr.length;
}

function calculateMenAverageAge(people, century) {
  let filterMan = people.filter(item => item.sex === 'm');

  filterMan = century
    ? filterMan.filter(item => Math.ceil(item.died / 100) === century)
    : filterMan;

  return averageAge(filterMan);
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
  let filterWoman = people.filter(item => item.sex === 'f');

  filterWoman = withChildren
    ? filterWoman.filter(item => people.find(child =>
      child.mother === item.name))
    : filterWoman;

  return averageAge(filterWoman);
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const childrens = people
    .filter(({ sex, mother }) => onlyWithSon
      ? people.find(({ name }) => sex === 'm' && mother === name)
      : people.find(({ name }) => mother === name)
    );

  return childrens.reduce((sum, { mother, born }) =>
    sum + born - people.find(({ name }) => name === mother).born, 0)
    / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
