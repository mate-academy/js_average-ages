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

function averageReduce(peopleList) {
  return peopleList.map(person => person.died - person.born)
    .reduce((a, b) => a + b) / peopleList.length;
}

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => (
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    )
    : people.filter(person => person.sex === 'm');

  return averageReduce(men);
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace if () statement with &&, || or ?:
  // without nesting
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
  const women = withChildren
    ? people.filter(person => (
      person.sex === 'f' && people.some(child => child.mother === person.name)
    ))
    : people.filter(person => person.sex === 'f');

  return averageReduce(women);
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
  const children = onlyWithSon
    ? people.filter(person => (
      person.sex === 'm' && people.some(mother => mother.name === person.mother)
    ))
    : people.filter(person => people
      .some(mother => mother.name === person.mother));

  return children.map(child => child.born
    - people.find(mother => mother.name === child.mother).born)
    .reduce((a, b) => a + b) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
