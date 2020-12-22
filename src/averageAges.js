'use strict';

const people = require('./people');

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
function calculateMenAverageAge(peopleMen, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = (century === undefined)
    ? peopleMen.filter(person => person.sex === 'm')
    : peopleMen.filter(person => person.sex === 'm'
      && century === Math.ceil(person.died / 100));

  const totalAge = men.reduce((sum, item) =>
    sum + item.died - item.born, 0);

  return totalAge / men.length;
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
function calculateWomenAverageAge(peopleWomen, withChildren) {
  const women = (!withChildren)
    ? peopleWomen.filter(person => person.sex === 'f')
    : peopleWomen.filter(person =>
      person.sex === 'f' && peopleWomen.some(child =>
        child.mother === person.name)
    );

  const totalAge = women.reduce((sum, item) =>
    sum + item.died - item.born, 0);

  return totalAge / women.length;
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
function calculateAverageAgeDiff(peopleDiff, onlyWithSon) {
  const women = peopleDiff.filter(woman =>
    woman.sex === 'f'
      && people.some(child =>
        child.mother === woman.name));

  const children = (!onlyWithSon)
    ? peopleDiff.filter(child =>
      women.some(woman =>
        woman.name === child.mother))
    : peopleDiff.filter(child =>
      women.some(woman =>
        woman.name === child.mother && child.sex === 'm'));

  const diff = children.map(child =>
    child.born - women.find(woman => child.mother === woman.name).born);

  const totalDiff = diff.reduce((sum, item) =>
    sum + item, 0
  );

  return Math.round((totalDiff / children.length) * 100) / 100;
}

calculateAverageAgeDiff(people);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
