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
  const menList = (century === undefined)
    ? people.filter(person => (person.sex === 'm'))
    : people.filter(person => (
      person.sex === 'm' && Math.ceil(person.died / 100) === century));

  const sumOfAges = menList.map(
    person => person.died - person.born).reduce((sum, age) => sum + age, 0);

  return +(sumOfAges / menList.length).toFixed(2);
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

  const womenList = (withChildren === undefined)
    ? people.filter(person => (person.sex === 'f'))
    : people.filter(person => ((person.sex === 'f') && people.some(
      child => person.name === child.mother)));

  const sumOfAges = womenList.map(
    woman => woman.died - woman.born).reduce((sum, age) => sum + age, 0);

  return +(sumOfAges / womenList.length).toFixed(2);
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

  const womenList = people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name));

  const childrenList = (onlyWithSon === undefined)
    ? people.filter(child =>
      womenList.some(mother => child.mother === mother.name))
    : people.filter(child => child.sex === 'm'
    && womenList.some(mother => child.mother === mother.name));

  const ageDiffs = childrenList.map(child => child.born - womenList.find(
    mother => mother.name === child.mother).born);

  const sumOfDiffs = ageDiffs.reduce((sum, item) => sum + item, 0);

  return +(sumOfDiffs / ageDiffs.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
