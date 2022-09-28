'use strict';

function avarageAge(people) {
  const reducerPeople = people.reduce((prev, current) => prev
  + (current.died - current.born), 0)
   / people.length;

  return reducerPeople;
}

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
  const men = people.filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  return avarageAge(men);
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
  const womenWithChildren = people.filter(person => person.sex === 'f');

  return !withChildren
    ? avarageAge(womenWithChildren)
    : avarageAge(womenWithChildren.filter(woman => (
      people.some(person => person.mother === woman.name))));
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
  const womenWithChildren = people.filter(child => child.mother
    && people.find(person => person.name === child.mother));

  const withSonOnly = womenWithChildren.filter(person => person.sex === 'm');

  const ageDifference = arr => arr.reduce((prev, curr) =>
    prev + curr.born - people.find(person =>
      person.name === curr.mother).born, 0) / arr.length;

  return !onlyWithSon
    ? ageDifference(womenWithChildren)
    : ageDifference(withSonOnly);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
