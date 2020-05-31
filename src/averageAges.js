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
  const persons = people.filter(person =>
    (century !== undefined) ? Math.ceil(person.died / 100) === century
    && person.sex === 'm' : person.sex === 'm');

  return persons.map(person => person.died - person.born)
    .reduce((acc, age) => acc + age) / persons.length;

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
  // write code here
  const persons = people.filter(person =>
    (withChildren === true)
      ? people.some(item => item.mother === person.name)
      : person.sex === 'f');

  return persons.map(person => person.died - person.born)
    .reduce((acc, age) => acc + age) / persons.length;
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
  const persons = people.filter(person =>
    (onlyWithSon)
      ? person.sex === 'm' && people.some(item => item.name === person.mother)
      : people.some(item => item.name === person.mother));

  return +(persons.map(person =>
    person.born - (people.find(x =>
      person.mother === x.name).born))
    .reduce((acc, diff) => acc + diff) / persons.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
