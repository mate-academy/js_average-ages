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
  let menTotalAge = 0;
  let count = people.length;

  function calculateCentury(year) {
    return Math.ceil(year / 100);
  }

  !century
    ? (people.forEach(person => {
      person.sex === 'm'
        ? menTotalAge += person.died - person.born
        : count--;
    }))
    : (people.forEach(person => {
      person.sex === 'm' && calculateCentury(person.died) === 18
        ? menTotalAge += person.died - person.born
        : count--;
    }));

  return menTotalAge / count;
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
  let womenTotalAge = 0;
  let count = people.length;

  !withChildren
    ? (people.forEach(person => {
      person.sex === 'f'
        ? womenTotalAge += person.died - person.born
        : count--;
    }))
    : (people.forEach(person => {
      person.sex === 'f'
      && people.find(child => child.mother === person.name)
        ? womenTotalAge += person.died - person.born
        : count--;
    }));

  return womenTotalAge / count;
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
  let womenTotalAge = 0;
  let count = people.length;

  !onlyWithSon
    ? people.forEach(person => {
      people.find(mom => person.mother === mom.name)
        ? womenTotalAge += person.born - people.find(mom =>
          person.mother === mom.name).born
        : count--;
    })
    : people.forEach(person => {
      people.find(mom => person.mother === mom.name && person.sex === 'm')
        ? womenTotalAge += person.born - people.find(mom =>
          person.mother === mom.name).born
        : count--;
    });

  return womenTotalAge / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
