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
  const lengthWithCentury = people
    .filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    .map(person => person.died - person.born).length;

  const lengthWithoutCentury = people
    .filter(person => person.sex === 'm')
    .map(person => person.died - person.born).length;

  return century
    ? people
      .filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
      .map(person => person.died - person.born)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }) / lengthWithCentury
    : people
      .filter(person => person.sex === 'm')
      .map(person => person.died - person.born)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }) / lengthWithoutCentury;

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
  const lengthWithChildren = people
    .filter(person => person.sex === 'f'
    && people.some(child => person.name === child.mother))
    .map(person => person.died - person.born).length;

  const lengthWithoutChildren = people
    .filter(person => person.sex === 'f')
    .map(person => person.died - person.born).length;

  return withChildren
    ? people
      .filter(person => person.sex === 'f'
      && people.some(child => person.name === child.mother))
      .map(person => person.died - person.born)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }) / lengthWithChildren
    : people
      .filter(person => person.sex === 'f')
      .map(person => person.died - person.born)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }) / lengthWithoutChildren;
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
  const filteredWithMothers = people.filter(person => {
    return onlyWithSon
      ? person.sex === 'm'
      && people
        .some(actualMother => person.mother === actualMother.name)
      : people
        .some(actualMother => person.mother === actualMother.name);
  });

  const differenceBetweenAges = filteredWithMothers
    .map(person => {
      return person.born - people
        .find(mother => mother.name === person.mother).born;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

  return differenceBetweenAges / filteredWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
