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
  const menOfOurCent = people.filter((person) => {
    return Math.ceil(person.died / 100) === century && person.sex === 'm';
  });// all men of our century
  const men = people.filter((person) => {
    return person.sex === 'm';
  });
  let sum = 0;

  if (century !== undefined) {
    sum = menOfOurCent.reduce((prev, { born, died }) => {
      return prev + died - born;
    }, 0);

    return sum / menOfOurCent.length;
  }

  sum = men.reduce((prev, { born, died }) => {
    return prev + died - born;
  }, 0);

  return sum / men.length;
  // learn how to use array methods like
  // filter .map .some .every .find .reduce
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
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothersArr = [];

  for (let i = 0; i < people.length; i++) {
    mothersArr.push(people.filter((person) => {
      return person.name === people[i].mother;
    }));
  }
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
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
