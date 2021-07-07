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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let mens;

  if (!century) {
    mens = people.filter(person => person.sex === 'm');
  } else {
    mens = people.filter(person => person.sex === 'm' && Math.ceil(person.died / 100) === century);
  }

  return mens.reduce((a, x) => a + (x.died - x.born), 0) / mens.length;
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
  let womens;

  if (!withChildren) {
    womens = people.filter(person => person.sex === 'f');
  } else {
    womens = people.filter(person => person.sex === 'f' && people.some(child => child.mother === person.name));
  }

  return womens.reduce((a, x) =>
    a + (x.died - x.born), 0) / womens.length;
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
  let childs;

  if (!onlyWithSon) {
    childs = people.filter(child =>
      people.some(mother => mother.name === child.mother));
  } else {
    childs = people.filter(child =>
      people.some(mother =>
        mother.name === child.mother)
        && child.sex === 'm');
  }

  const ageDifference = childs.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  return ageDifference.reduce((a, x) => a + x, 0) / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
