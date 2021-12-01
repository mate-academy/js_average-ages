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
function getAges(people) {
  return people.map(el => el.died - el.born);
}

function getAverage(numbers) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function getDifferenceAges(people1, people2) {
  return people1.map(
    el1 => el1.born - people2.find(el2 => el2.name === el1.mother).born);
}

function calculateMenAverageAge(people, century) {
  const menArray = people.filter(
    person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return getAverage(getAges(menArray));
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
  const womenArray = people.filter(
    person => withChildren
      ? people.some(child => child.mother === person.name)
      : person.sex === 'f');

  return getAverage(getAges(womenArray));
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
  const childrenArray = people.filter(
    child => onlyWithSon
      ? people.some(mother => mother.name === child.mother && child.sex === 'm')
      : people.some(mother => mother.name === child.mother));

  return getAverage(getDifferenceAges(childrenArray, people));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
