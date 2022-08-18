'use strict';

// const people = require('./people');

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
  const manArray = people.filter(person => (
    person.sex === 'm' && (century !== undefined
      ? Math.ceil(person.died / 100) === century : true)));
  let average = manArray
    .map(man => man.died - man.born)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  average /= manArray.length;

  return +average.toFixed(2);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womanArray = people.filter(female => (
    female.sex === 'f' && (withChildren
      ? people.find(woman => female.name === woman.mother) : true)));
  let averageWoman = womanArray
    .map(woman => woman.died - woman.born)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  averageWoman /= womanArray.length;

  return +averageWoman.toFixed(2);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenAndMotherArray = people
    .map(person => {
      const personMom = people
        .find(folk => folk.name === person.mother);

      return {
        ...person, mom: personMom,
      };
    })
    .filter(folk => {
      const isChild = people
        .some(person => folk.mother === person.name);

      return isChild;
    })
    .filter(folk => (onlyWithSon ? folk.sex === 'm' : true));

  let childrenAndMotherAverage = childrenAndMotherArray
    .map(person =>
      ({
        born: person.born,
        bornMother: person.mom.born,
      }))
    .map(folk => folk.born - folk.bornMother)
    .reduce((last, current) => last + current, 0);

  childrenAndMotherAverage /= (childrenAndMotherArray.length);

  return +childrenAndMotherAverage.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
