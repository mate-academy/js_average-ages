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
/* eslint-disable */
Array.prototype.getAverage = function() {
  return this.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0) / this.length;
};

/* eslint-enable */
function calculateMenAverageAge(people, century) {
  return people
    .filter((person) => person.sex === 'm')
    .filter(man => century === undefined
      ? true : Math.ceil(man.died / 100) === century)
    .getAverage();
}

/**
 * Implement calculateWomenAverageAge function
 *
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  return people
    .filter((person) => person.sex === 'f')
    .filter((woman) => withChildren === undefined
      ? true : people.some((child) => child.mother === woman.name))
    .getAverage();
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const ageDifferences = people
    .filter((person) => people.some((mother) => mother.name === person.mother))
    .filter((child) => onlyWithSon === undefined ? true : child.sex === 'm')
    .map(child => child.born
    - people.find((mother) => mother.name === child.mother).born);

  return ageDifferences.reduce((a, b) => a + b) / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
