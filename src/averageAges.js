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
  const arrayOfMan = people.filter(({ sex, died }) => century ? sex
    === 'm' && Math.ceil(died / 100) === century : sex === 'm');

  return averageValue(arrayOfMan);
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
  const arrayOfWoman = people.filter(({ sex, name }) =>
    sex === 'f' && (!withChildren || people.some(({ mother }) =>
      mother === name)));

  return averageValue(arrayOfWoman);
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
  const child = people.filter(({ sex, mother }) => people.some(({ name }) =>
    mother === name) && (!onlyWithSon || sex === 'm'));

  const ageDiff = child.map(({ mother, born }) =>
    born - people.find(({ name }) =>
      mother === name).born);

  return ageDiff.reduce((sum, diff) =>
    sum + diff) / ageDiff.length;
}

function averageValue(arrayAge) {
  return arrayAge.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / arrayAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
