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
  const mans = people.filter((person) => person.sex === 'm');
  const centuryFilter = mans.filter((person) =>
    century === (Math.ceil(person.died / 100)));

  const actualArray = century ? centuryFilter : mans;

  return actualArray.reduce((acc, person) =>
    (acc + (person.died - person.born)), 0) / actualArray.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const allWomans = people.filter((person) => person.sex === 'f');
  const womanWithChildrens = allWomans.filter((person) =>
    people.some((child) => child.mother === person.name));

  const actualArray = withChildren ? womanWithChildrens : allWomans;

  return actualArray.reduce((acc, person) =>
    (acc + (person.died - person.born)), 0) / actualArray.length;
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
  // write code here
  const children = people.filter((child) =>
    people.some((mother) => child.mother === mother.name));
  const sons = children.filter((son) => son.sex === 'm');

  const actualArray = (onlyWithSon) ? sons : children;

  return actualArray.reduce((acc, child) => {
    const motherRef = people.find((mother) => child.mother === mother.name);

    return acc + (child.born - motherRef.born);
  }, 0) / actualArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
