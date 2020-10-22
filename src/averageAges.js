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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const peopleLifeExpectancy = [];

  century
    ? people.some(function(itemMan) {
      itemMan.sex === 'm'
    && Math.ceil(itemMan.died / 100) === century
    && peopleLifeExpectancy.push(itemMan.died - itemMan.born);
    })
    : people.some(function(itemMan) {
      itemMan.sex === 'm'
    && peopleLifeExpectancy.push(itemMan.died - itemMan.born);
    });

  let result = peopleLifeExpectancy;

  result = result.reduce((sum, x) => sum + x, 0) / result.length;

  return result;
};

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

  const peopleLifeExpectancy = [];
  const isMother = (woman) => people.some(
    (human) => human.mother === woman.name);

  withChildren
    ? people.some(function(itemWoman) {
      itemWoman.sex === 'f'
      && isMother(itemWoman)
        && peopleLifeExpectancy.push(itemWoman.died - itemWoman.born);
    })
    : people.some(function(itemWoman) {
      itemWoman.sex === 'f'
        && peopleLifeExpectancy.push(itemWoman.died - itemWoman.born);
    });

  let result = peopleLifeExpectancy;

  result = result.reduce((sum, x) => sum + x, 0) / result.length;

  return result;
};

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
  const peopleLifeExpectancy = [];

  people.some(function(itemMother) {
    onlyWithSon !== undefined
      ? people.some(function(itemSon) {
        itemSon.mother === itemMother.name
      && itemSon.sex === 'm'
      && peopleLifeExpectancy.push(itemSon.born - itemMother.born);
      })
      : people.some(function(itemChild) {
        itemChild.mother === itemMother.name
      && peopleLifeExpectancy.push(itemChild.born - itemMother.born);
      });
  });

  let result = peopleLifeExpectancy;

  result = result.reduce((sum, x) => sum + x, 0) / result.length;

  return result;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
