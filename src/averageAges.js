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

const findAverage = function(arr, special, people) {
  return special
    ? +(arr.reduce((sum, child) => {
      const mother = people.find(ma => ma.name === child.mother);

      return sum + (child.born - mother.born);
    }, 0) / arr.length).toFixed(2)
    : +(arr.map(({ born, died }) => died - born)
      .reduce((sum, current) => sum + current) / arr.length)
      .toFixed(2);
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(man =>
    century
      ? man.sex === 'm'
      && Math.ceil(man.died / 100) === century
      : man.sex === 'm');

  return findAverage(men);
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
  const mothers = people.filter(mother =>
    withChildren
      ? mother.sex === 'f'
      && people.filter(child => child.mother === mother.name).length > 0
      : mother.sex === 'f');

  return findAverage(mothers);
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
  const childs = people.filter(child =>
    onlyWithSon
      ? child.sex === 'm' && people.find(mother => mother.name === child.mother)
      : people.find(mother => mother.name === child.mother));

  return findAverage(childs, true, people);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
