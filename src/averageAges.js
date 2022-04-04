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
 * @param {null} century - optional
 *
 * @return {number}
 */

function getAverageAge(people) {
  const result = people.map((man) => man.died - man.born);

  const getAge = result.reduce(
    (x, b) => x + b, 0
  ) / result.length;

  return Number(getAge.toFixed(2));
}

function calculateMenAverageAge(people, century = null) {
  let result = people.filter(
    (man) => man.sex === 'm');

  if (century !== null) {
    result = result.filter(
      (man) => century === Math.ceil(man.died / 100)
    );
  }

  return getAverageAge(result);
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
function calculateWomenAverageAge(people, withChildren = false) {
  let result = people.filter((woman) => woman.sex === 'f');

  if (withChildren) {
    result = result.filter(
      (mother) => people.find((child) => child.mother === mother.name));
  }

  return getAverageAge(result);
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
  let resultChild = people.filter(
    child => people.find(mother => child.mother === mother.name));

  if (onlyWithSon) {
    resultChild = resultChild.filter(child => child.sex === 'm');
  }

  const getAge = resultChild.map((child) => child.born - people.find(
    (mother) => child.mother === mother.name).born);

  const result = getAge.reduce((a, b) => a + b, 0) / resultChild.length;

  return Number(result.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
