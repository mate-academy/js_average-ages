'use strict';

// const people1 = require('./people');
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
  let counter = 0;

  const withoutCentury = (item) => !century && item.sex === 'm';
  const withCentury = (item) => century === Math.ceil(item.died / 100)
  && item.sex === 'm';

  return people.reduce((accum, person) => {
    let newAccum = accum;

    withoutCentury(person) || withCentury(person)
      ? (newAccum += person.died - person.born) && counter++
      : newAccum = accum;

    return newAccum;
  }, 0) / counter;
}

// console.log(length)
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
  // write code here
  let counter = 0;

  const childern = {};

  people.forEach((item) => {
    if (item.mother) {
      childern[item.mother] = item.name;
    }
  });

  return people.reduce((accum, person) => {
    let newAccum = accum;

    if (person.sex === 'f') {
      if (!withChildren) {
        newAccum += person.died - person.born;
        counter++;
      } else {
        if (person.name in childern) {
          newAccum += person.died - person.born;
          counter++;
        }
      }
    }

    return newAccum;
  }, 0) / counter;
}

// console.log(calculateWomenAverageAge(people1, true));

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
  const childern = {};
  let counter = 0;

  people.forEach(item => {
    childern[item.mother] = 0;
  });

  people.forEach(item => {
    if (item.name in childern) {
      childern[item.name] = item.born;
    }
  });

  // console.log(childern);

  return people.reduce((accum, person) => {
    let newAccum = accum;

    if (childern[person.mother]) {
      if (!onlyWithSon) {
        newAccum += person.born - childern[person.mother];
        counter++;
      } else {
        if (person.sex === 'm') {
          newAccum += person.born - childern[person.mother];
          counter++;
        }
      }
    }

    return newAccum;
  }, 0) / counter;
}

// console.log(calculateAverageAgeDiff(people1, true));

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
