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

  const menAgeArr = (people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'))
    .map(person => person.died - person.born);

  return menAgeArr.reduce((a, b) => a + b, 0) / menAgeArr.length;
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
  const womenAgeArr = people.filter(person => withChildren
    ? people.some(item => item.mother === person.name)
    : person.sex === 'f')
    .map(person => person.died - person.born);

  return womenAgeArr.reduce((a, b) => a + b, 0) / womenAgeArr.length;
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
  const ageDiffArray
    = people.filter(person => onlyWithSon
      ? people.some(item => item.name === person.mother) && person.sex === 'm'
      : people.some(item => item.name === person.mother))
      .map(child => child.born
        - people.find(mom => mom.name === child.mother).born);

  return ageDiffArray.reduce((a, b) => a + b, 0) / ageDiffArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
