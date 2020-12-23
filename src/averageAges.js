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
  let result = [];

  result = people.filter(person =>
    century ? Math.ceil(person.died / 100) === century
    && person.sex === 'm' : person.sex === 'm');

  const sum = result.reduce((accumulator, curentValue) => {
    return accumulator + (curentValue.died - curentValue.born);
  }, 0);

  return sum / result.length;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
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
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let result = [];
  const female = people.filter(person => person.sex === 'f');

  withChildren
    ? result = female.filter(mother =>
      people.some(person => person.mother === mother.name)) : result = female;

  const sum = result.reduce((accumulator, curentValue) => {
    return accumulator + (curentValue.died - curentValue.born);
  }, 0);

  return sum / result.length;
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
  let result = [];

  const children = people
    .filter(child => people.some(mother => mother.name === child.mother));
  const sons = children.filter(son => son.sex === 'm');

  onlyWithSon
    ? result = sons.map(child => child.born - people
      .find(mother => mother.name === child.mother).born)
      .reduce((a, b) => a + b) / sons.length
    : result = children.map(child => child.born - people
      .find(mother => mother.name === child.mother).born)
      .reduce((a, b) => a + b) / children.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
