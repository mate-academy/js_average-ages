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
  const men = people.filter(person => person.sex === 'm'
  && (!century ? true : Math.ceil(person.died / 100) === century));
  const getAges = men.map(({ died, born }) => died - born);
  const averageAge = getAges.reduce((sum, age) => sum + age, 0)
  / getAges.length;

  return averageAge;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people.filter(person => person.sex === 'f' && (withChildren
    ? people.find(child => child.mother === person.name) : true));
  const getAges = women.map(({ died, born }) => died - born);
  const averageAge = getAges.reduce((sum, age) => sum + age, 0)
  / getAges.length;

  return averageAge;

  // write code here
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
  const children = people.filter(person => onlyWithSon ? people.some(mom =>
    person.mother === mom.name && person.sex === 'm') : people.some(mom =>
    person.mother === mom.name));
  const average = children.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0) / children.length;

  return average;
  // write code here
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
