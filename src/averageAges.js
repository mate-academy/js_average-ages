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

  const men = (century)
    ? people.filter(person => (
      person.sex === 'm' && Math.ceil(person.died / 100) === century
    ))
    : people.filter(person => person.sex === 'm');

  const summaryAge = men
    .reduce((prev, current) => prev + current.died - current.born, 0);

  const result = summaryAge / men.length;

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
  const women = (withChildren)
    ? people.filter(person => (
      person.sex === 'f'
   && people.some(human => human.father === person.name
   || human.mother === person.name)
    ))
    : people.filter(person => person.sex === 'f');

  const summaryAge = women
    .reduce((prev, current) => prev + current.died - current.born, 0);

  const result = summaryAge / women.length;

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
  const children = (onlyWithSon)
    ? people.filter(person => (
      person.mother !== null
   && person.sex === 'm'
   && people.some(human => person.mother === human.name)
    ))
    : people.filter(person => (
      person.mother !== null
   && people.some(human => human.name === person.mother)
    ));

  const difference = children
    .reduce((prev, current) => (
      prev + current.born - people.find(human => (
        current.mother === human.name
      )).born), 0);

  const result = difference / children.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
