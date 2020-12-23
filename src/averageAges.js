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
  const men = people.filter(person => century
    ? person.sex === 'm'
  && (century === Math.ceil(person.died / 100))
    : person.sex === 'm');

  const menAge = men.map(person => person.died - person.born);

  return menAge.reduce((sum, age) => sum + age, 0) / menAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = withChildren
    ? people.filter(woman =>
      people.some(child => child.mother === woman.name))
    : people.filter(person => person.sex === 'f');

  const womenAge = women.map(person => person.died - person.born);

  return womenAge.reduce((sum, age) => sum + age, 0) / womenAge.length;
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
  const children = people.filter(child => onlyWithSon
    ? people.some(woman => woman.name === child.mother)
      && child.sex === 'm'
    : people.some(woman => woman.name === child.mother));

  const diffOfMumAndChildAge = children.map(child =>
    child.born - people.find(woman => woman.name === child.mother).born);

  return diffOfMumAndChildAge.reduce((sum, diffAge) => sum + diffAge, 0)
  / diffOfMumAndChildAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
