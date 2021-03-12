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
  let mens;

  (century > 0) ? mens = people.filter(x =>
    (x.sex === 'm') && (Math.ceil(x.died / 100) === century))
    : mens = people.filter(x => x.sex === 'm');

  const sum = mens.reduce((y, x) => y + (x.died - x.born), 0);
  const averageAge = sum / mens.length;

  return averageAge;
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
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let womens;

  (withChildren === true) ? womens = people.filter(person =>
    (person.sex === 'f') && (people.some(x => x.mother === person.name)))
    : womens = people.filter(x => x.sex === 'f');

  const sum = womens.reduce((y, x) => y + (x.died - x.born), 0);
  const averageAge = sum / womens.length;

  return averageAge;
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
  const mothers = people.filter(person =>
    (people.some(x => x.mother === person.name)));
  let children;

  onlyWithSon ? children = people.filter(person =>
    (people.some(x => person.mother === x.name)) && (person.sex === 'm'))
    : children = people.filter(person =>
      (people.some(x => person.mother === x.name)));

  const diffList = children.map(y =>
    y.born - mothers.find(x => x.name === y.mother).born);
  const sumDiff = diffList.reduce((x, y) => x + y, 0);
  const averageAgeDiff = sumDiff / diffList.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
