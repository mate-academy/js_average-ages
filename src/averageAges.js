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
  const men = (arguments.length < 2)
    ? people.filter(item => item.sex === 'm')
    : people.filter(item => item.sex === 'm'
      && Math.ceil(item.died / 100) === century);
  const menAge = men.map(item => item.died - item.born);
  const sumMenAge = menAge.reduce((sum, item) => sum + item, 0);
  const result = sumMenAge / men.length;

  return result;
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
  const women = (arguments.length < 2)
    ? people.filter(item => item.sex === 'f')
    : people.filter(item => item.sex === 'f').filter(item =>
      people.some(element => element.mother === item.name));
  const womenAge = women.map(item => item.died - item.born);
  const sumWomenAge = womenAge.reduce((sum, item) => sum + item, 0);
  const result = sumWomenAge / women.length;

  return result;
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
  const childrenHasMother = (arguments.length < 2)
    ? people.filter(item => people.some(element =>
      element.name === item.mother) === true)
    : people.filter(item => people.some(element =>
      element.name === item.mother) === true && item.sex === 'm');
  const diffAge = childrenHasMother.map(item =>
    item.born - people.find(element => element.name === item.mother).born);
  const sumDiffAge = diffAge.reduce((sum, item) => sum + item, 0);
  const result = sumDiffAge / diffAge.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
