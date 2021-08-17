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
  let counter = 0;
  let diedInThisCentury;
  let currentCentury = century;

  const averageAge = people.reduce(function(prev, item) {
    diedInThisCentury = Math.ceil(item.died / 100);

    if (century === undefined) {
      currentCentury = diedInThisCentury;
    }

    if (item.sex === 'm' && diedInThisCentury === currentCentury) {
      counter++;

      return prev + (item.died - item.born);
    } else {
      return prev;
    }
  }, 0);

  return averageAge / counter;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  let counter = 0;
  let peoples = people;

  if (withChildren === true) {
    const children = people.filter(item =>
      people.some(person => person.mother === item.name));

    peoples = children;
  }

  const averageAge = peoples.reduce(function(prev, item) {
    if (item.sex === 'f') {
      counter++;

      return prev + (item.died - item.born);
    } else {
      return prev;
    }
  }, 0);

  return averageAge / counter;
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
    ? people.filter(person => person.sex === 'm'
    && people.some(woman => woman.name === person.mother))
    : people.filter(person => people.some(woman =>
      woman.name === person.mother));

  const averageAgeDifference = children.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  return averageAgeDifference.reduce((sum, current) =>
    sum + current) / averageAgeDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
