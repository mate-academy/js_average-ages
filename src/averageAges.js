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
  const men = people.filter(value => value.sex === 'm');

  const filteredMen = century
    ? men.filter(value => Math.ceil(value.died / 100) === century)
    : men;

  const menLifeDuration = filteredMen.map(value => value.died - value.born);

  const sumAges = menLifeDuration.reduce(
    (prevVal, currVal) => prevVal + currVal
  );

  return sumAges / filteredMen.length;
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
  const women = people.filter(value => value.sex === 'f');

  const womenFilterd = withChildren
    ? women.filter(value => people.find(value2 =>
      value2.mother === value.name))
    : women;

  const womenLifeDuration = womenFilterd.map(value => value.died - value.born);

  const sumAges = womenLifeDuration.reduce(
    (prevVal, currVal) => prevVal + currVal
  );

  return sumAges / womenFilterd.length;
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
  const children = people.filter(value =>
    people.find(value2 =>
      value2.name === value.mother));

  const childrenToCalc = onlyWithSon
    ? children.filter(value => value.sex === 'm')
    : children;

  const ageDiff = childrenToCalc.map(value =>
    value.born
    - people[people.findIndex(value2 => value2.name === value.mother)].born);

  const sumAges = ageDiff.reduce(
    (prevVal, currVal) => prevVal + currVal
  );

  return sumAges / childrenToCalc.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
