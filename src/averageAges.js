'use strict';

/**
 * Implement calculateMenAverageAge function
 * It should return average age of men in array
 * If `century` is specified then calculate only for men living in this century
 * To calculate century:
 * Take rounded number of the year of their death divided by 100: Math.ceil(person.died / 100)
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
  // replace `if ()` statement with logical operators (&&, ||) or ternary operator (?:)
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 * It should return average ave of women in array
 * If `withChildren` is specified then calculate only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {

}

/**
 * Implement calculateAverageAgeDiff function
 * It should return average difference in age
 * between all mothers and their children
 * which are presented in the array
 * (child's year of birth - mother's year of birth)
 *
 * If `onlyWithSon` is specified then calculate only for mothers who has son
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
  calculateAverageAgeDiff
};
