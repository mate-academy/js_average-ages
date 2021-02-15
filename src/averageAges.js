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

  const mens = people.filter(x => x.sex === 'm');
  const ages
    = mens.reduce((a, b) =>
      a + (b.died - b.born), 0) / mens.length;

  const mansWithCentury = mens.filter(a => Math.ceil(a.died / 100) === century);

  const agesWithCentury
    = mansWithCentury.reduce((a, b) =>
      a + (b.died - b.born), 0) / mansWithCentury.length;

  return century ? agesWithCentury : ages;
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
  const women = people.filter(x => x.sex === 'f');
  const ages = women.reduce((a, b) =>
    a + (b.died - b.born), 0) / women.length;

  const isNull = null;
  const childrenWithMother = people.filter(a => a.mother !== isNull);
  const mothers = people.filter((a) =>
    childrenWithMother.some(b => a.name === b.mother));

  const momAge = mothers.reduce((a, b) =>
    a + (b.died - b.born), 0) / mothers.length;

  return withChildren ? momAge : ages;
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
  const child = people.filter(a => people.some(b => b.name === a.mother));
  const childAges = child.map(a =>
    a.born - people.find(b =>
      b.name === a.mother).born);
  const diff = childAges.reduce((a, b) => a + b) / child.length;

  const sons = people.filter(a =>
    people.some(b => a.mother === b.name) && a.sex === 'm');
  const sonsAges = sons.map(a =>
    a.born - people.find(b => b.name === a.mother).born);
  const sonsAgesDiff = sonsAges.reduce((a, b) => a + b) / sons.length;

  return onlyWithSon ? sonsAgesDiff : diff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
