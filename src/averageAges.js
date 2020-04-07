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

const average = function(array) {
  return array.reduce((accum, item) => {
    return accum + (item.died - item.born);
  }, 0) / array.length;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  let mans = people.filter(man => man.sex === 'm');

  if (century) {
    mans = mans.filter(item => {
      return Math.ceil(item.died / 100) === century;
    });
  }

  return average(mans);
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
  let womans = people.filter(women => women.sex === 'f');

  if (withChildren) {
    womans = womans.filter(item => people
      .find(men => men.mother === item.name));
  }

  return average(womans);
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
  const ageDif = people.filter(item => onlyWithSon ? item.sex === 'm' : true)
    .map(item => {
      const mom = people.find(mother => mother.name === item.mother);

      return mom ? item.born - mom.born : '';
    })
    .filter(dif => dif);

  const sum = ageDif.reduce((accum, item) => accum + item, 0);

  return sum / ageDif.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
