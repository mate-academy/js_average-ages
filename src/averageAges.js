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
  const mens = people.filter(person => (
    person.sex === 'm'
    && (
      (century) ? Math.ceil(person.died / 100) === century : true
    )
  ));

  const arrayOfAges = mens.map(man => man.died - man.born);
  const sumAllAges = arrayOfAges.reduce((prevValue, currentValue) => (
    prevValue + currentValue
  ));

  return Math.round(sumAllAges / arrayOfAges.length * 100) / 100;
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
  const womens = people.filter(person => (
    person.sex === 'f' && (
      (withChildren) ? people.some(child => child.mother === person.name) : true
    )
  ));

  const arrayOfAges = womens.map(woman => woman.died - woman.born);
  const sumAllAges = arrayOfAges.reduce((prevValue, currentValue) => (
    prevValue + currentValue
  ));

  return Math.round(sumAllAges / arrayOfAges.length * 100) / 100;
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
  const children = people.filter(person => (
    people.some(mother => mother.name === person.mother) && (
      (onlyWithSon) ? person.sex === 'm' : true
    )
  ));

  const arrayOfAges = children.map(child => (
    child.born - people.find(mother => mother.name === child.mother).born
  ));

  const sumAllAges = arrayOfAges.reduce((prevValue, currentValue) => (
    prevValue + currentValue
  ));

  return Math.round(sumAllAges / arrayOfAges.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
