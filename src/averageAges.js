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
function calculateMenAverageAge(people, century = 0) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let peoples = {};

  if (century === 0) {
    peoples = people.filter(x => x.sex === 'm');
  } else {
    peoples = people.filter(x => (Math.ceil(x.died / 100) === century
    && x.sex === 'm'));
  }

  const res = peoples.map(x => x.died - x.born);

  return (res.reduce((a, b) => a + b, 0)) / res.length;
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
  let mothers;

  if (withChildren) {
    mothers = people.map(x => x.mother);
    mothers = people.filter(x => mothers.includes(x.name));
  } else {
    mothers = people.filter(x => x.sex === 'f');
  }

  mothers = mothers.map(x => x.died - x.born);

  return mothers.reduce((a, b) => a + b, 0) / mothers.length;
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
  let mothers;

  mothers = people.map(x => x.mother);
  mothers = people.filter(x => mothers.includes(x.name));

  let res = people.map((x) => {
    for (const value of mothers) {
      if (value.name === x.mother) {
        if (onlyWithSon) {
          if (x.sex === 'm') {
            return x.born - value.born;
          }
        } else {
          return x.born - value.born;
        }
      }
    }

    return '';
  });

  res = res.filter(x => x !== '');

  return res.reduce((a, b) => a + b, 0) / res.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
