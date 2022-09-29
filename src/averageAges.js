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

function averageAge(people) {
  return people
    .map(person => person.died - person.born)
    .reduce((sum, x) => sum + x)
    / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = people
    .filter(person => person.sex === 'm');

  return !century
    ? averageAge(men)
    : averageAge(men.filter(person =>
      Math.ceil(person.died / 100) === century));
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
  const women = people
    .filter(person => person.sex === 'f');

  return !withChildren
    ? averageAge(women)
    : averageAge(women
      .filter(person => people
        .find(child => child.mother === person.name)
      ));
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
  const womenWithChil = people
    .filter(child => child.mother && people
      .find(person => person.name === child.mother));

  const withSonOnly = womenWithChil
    .filter(person => person.sex === 'm');

  const ageDifference = array => array.reduce((sum, child) =>
    sum + child.born - people
      .find(person => person.name === child.mother).born, 0) / array.length;

  return onlyWithSon
    ? ageDifference(withSonOnly) : ageDifference(womenWithChil);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
