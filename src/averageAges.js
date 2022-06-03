'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100:
 *  Math.ceil(person.died / 100)
 *
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

  let mans;

  if (century) {
    mans = people.filter(x =>
      x.sex === 'm' && (Math.ceil(x.died / 100) === century));
  } else {
    mans = people.filter(x => x.sex === 'm');
  }

  const allAge = mans.reduce((prev, x) =>
    prev + (x.died - x.born), 0);

  return allAge / mans.length;
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
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  let womens;

  if (withChildren) {
    womens = people.filter(x =>
      (people.some(y => y.mother === x.name)));
  } else {
    womens = people.filter(x => x.sex === 'f');
  }

  const allAge = womens.reduce((prev, x) =>
    prev + (x.died - x.born), 0);

  return allAge / womens.length;
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

function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  let child;

  if (onlyWithSon) {
    child = people.filter(x =>
      (people.some(y => y.name === x.mother && x.sex === 'm')));
  } else {
    child = people.filter(x => (people.some(y => y.name === x.mother)));
  }

  const difference = child.map(x =>
    (x.born - people.find(y => y.name === x.mother).born));

  const allAge = difference.reduce((prev, x) =>
    prev + x, 0);

  return allAge / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
