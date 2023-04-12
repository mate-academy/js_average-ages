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

function calculateMenAverageAge(people, century = 1) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let peopleArr = [];
  let sumOfAges = 0;

  century > 1
    ? peopleArr = people.filter((person) =>
      Math.ceil(person.died / 100) === century && person.sex === 'm')
    : peopleArr = people.filter((person) => person.sex === 'm');

  peopleArr.forEach((person) => {
    sumOfAges += (person.died - person.born);
  });

  return sumOfAges / peopleArr.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  let peopleArr = people.filter((person) => person.sex === 'f');
  let sumOfAges = 0;

  if (withChildren) {
    peopleArr = peopleArr.filter((person) =>
      people.find((item) => item.mother === person.name));
  }

  peopleArr.forEach((person) => {
    sumOfAges += (person.died - person.born);
  });

  return sumOfAges / peopleArr.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let totalAgeDiff = 0;
  let motherCount = 0;

  people.forEach((person) => {
    people.forEach((mother) => {
      if (onlyWithSon && person.sex === 'm' && person.mother === mother.name) {
        totalAgeDiff += person.born - mother.born;
        motherCount++;
      }

      if (!onlyWithSon && person.mother === mother.name) {
        totalAgeDiff += person.born - mother.born;
        motherCount++;
      }
    });
  });

  return totalAgeDiff / motherCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
