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

const callbackForCountSumOfAges = (sumOfAges, cuurentPerson) => {
  return (sumOfAges + cuurentPerson.died - cuurentPerson.born);
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const listOfMens = people.filter(person => person.sex === 'm');

  const menWhoDiedInThisSentury = listOfMens
    .filter(person => Math.ceil(person.died / 100) === century);

  const averageAge = (century !== undefined)
    ? menWhoDiedInThisSentury
      .reduce(callbackForCountSumOfAges, 0) / menWhoDiedInThisSentury.length
    : listOfMens.reduce(callbackForCountSumOfAges, 0) / listOfMens.length;

  return averageAge;
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

  const listOfWomens = people.filter(person => person.sex === 'f');
  const womensWithChildrens = people.filter(mother => {
    return people.some(child => {
      return mother.name === child.mother;
    });
  });

  const averageAge = (withChildren)
    ? womensWithChildrens.reduce(callbackForCountSumOfAges, 0)
    / womensWithChildrens.length
    : listOfWomens.reduce(callbackForCountSumOfAges, 0) / listOfWomens.length;

  return averageAge;
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

  const mothers = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(mother => person.mother === mother.name)
    : people.some(mother => person.mother === mother.name)
  );

  const difference = mothers.map(child => child.born - people
    .find(mother => mother.name === child.mother).born);

  const averageDifference = difference.reduce((sum, age) => (
    sum + age
  )) / difference.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
