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
  const menList = century
    ? people.filter(
      person => Math.ceil(parseInt(person.died) / 100) === century
      && person.sex === 'm')
    : people.filter(
      person => person.sex === 'm',
    );

  return findAverage(menList, (a, b) => a + (b.died - b.born));
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
  let womenList = people.filter(person => person.sex === 'f');

  womenList = withChildren
    ? womenList.filter(
      person => people.find(a => a.mother === person.name))
    : womenList;

  return findAverage(womenList, (a, b) => a + (b.died - b.born));
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
  const peopleWithMothers = people.filter(
    person => person.mother !== null && people.find(
      a => a.name === person.mother));

  const ageDifference = onlyWithSon ? peopleWithMothers.filter(
    person => person.sex === 'm').map(
    person => person.born - people.find(a => a.name === person.mother).born)
    : peopleWithMothers.map(
      person => person.born - people.find(a => a.name === person.mother).born);

  return findAverage(ageDifference, (a, b) => a + b);
}

function findAverage(array, callback) {
  return array.reduce(callback, 0) / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
