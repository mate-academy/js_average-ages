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

function isCenturyValid(century) {
  return function(person) {
    const centuryDeath = Math.ceil(person.died / 100);

    if (!century) {
      return true;
    }

    if (century === centuryDeath) {
      return true;
    }

    return false;
  };
}

function isMan(person) {
  return person.sex === 'm';
}

function isWomen(person) {
  return person.sex === 'f';
}

// function isMather(person, persons) {
// }

function calculateAverageAge(people, ...checks) {
  const menAges = people.reduce((ages, person, persons) => {
    const age = person.died - person.born;

    if (checks.every(check => check(person, persons))) {
      return ages.concat(age);
    }

    return ages;
  }, []);

  return menAges.reduce((sum, age) => sum + age, 0) / menAges.length;
}

function calculateMenAverageAge(people, century) {
  return calculateAverageAge(people, isMan, isCenturyValid(century));
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
  return calculateAverageAge(people, isWomen);
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
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
