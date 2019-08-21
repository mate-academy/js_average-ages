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
  let sum = 0;

  century === undefined
    ? people.reduce((acc, person) => {
      if (person.sex === 'm') {
        sum += (person.died - person.born);
      } else {
        counter++;
      }
    }, 0)
    : people.reduce((acc, person) => {
      if (person.sex === 'm' && century === Math.ceil(person.died / 100)) {
        sum += (person.died - person.born);
      } else {
        counter++;
      }
    }, 0);

  return sum / (people.length - counter);
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
  let sum = 0;
  let counter = 0;

  withChildren === true
    ? people.reduce((acc, person) => {
      if (person.sex === 'f'
        && people.some(kid => kid.mother === person.name)) {
        sum += (person.died - person.born);
      } else {
        counter++;
      }
    }, 0)
    : people.reduce((acc, person) => {
      if (person.sex === 'f') {
        sum += (person.died - person.born);
      } else {
        counter++;
      }
    }, 0);

  return sum / (people.length - counter);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  let sum = 0;
  let counter = 0;

  onlyWithSon === undefined
    ? people.reduce((acc, kid) => {
      if (people.find(mother => mother.name === kid.mother) !== undefined) {
        sum += kid.born - people
          .find(mother => mother.name === kid.mother).born;
      } else {
        counter++;
      }
    }, 0)
    : people.reduce((acc, kid) => {
      if (kid.sex === 'm'
        && people.find(mother => mother.name === kid.mother) !== undefined) {
        sum += kid.born - people
          .find(mother => mother.name === kid.mother).born;
      } else {
        counter++;
      }
    }, 0);

  return sum / (people.length - counter);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
