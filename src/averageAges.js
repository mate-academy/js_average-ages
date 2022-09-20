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
  let filteredMales = filterBySex(people, 'm');

  if (century) {
    filteredMales = filteredMales.filter(person => {
      return Math.ceil(person.died / 100) === century;
    });
  }

  return averageAge(filteredMales);
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
  let filteredFemales = filterBySex(people, 'f');

  if (withChildren) {
    filteredFemales = filteredFemales.filter(person => people.find(
      child => child.mother === person.name
    ));
  }

  return averageAge(filteredFemales);
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
  // write code here
  let filteredChildren = people.filter(person => people.find(
    mother => mother.name === person.mother
  ));

  if (onlyWithSon) {
    filteredChildren = filterBySex(filteredChildren, 'm');
  }

  const ageDifference = filteredChildren.reduce((prev, curr) =>
    (prev + curr.born - people.find(person =>
      person.name === curr.mother).born), 0);

  return ageDifference / filteredChildren.length;
}

function filterBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function averageAge(filteredArray) {
  const sumOfAge = filteredArray.map(person => person.died - person.born)
    .reduce((prev, curr) => prev + curr);

  return sumOfAge / filteredArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
