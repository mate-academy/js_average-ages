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
  const men = people.filter(person => person.sex === 'm');
  const ages = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0)
    / men.length;

  const mansWithCentury = men.filter(person => Math.ceil(person.died / 100)
  === century);

  const agesWithCentury = mansWithCentury.reduce((sum, person) =>
    sum + (person.died - person.born), 0)
    / mansWithCentury.length;

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
  // write code here
  const womens = people.filter(item => item.sex === 'f');
  const age = womens.reduce((acc, cur) =>
    acc + (cur.died - cur.born), 0) / womens.length;
  const isNull = null;
  const childrenWithMother = people.filter(item => item.mother !== isNull);
  const mothers = people.filter((women) =>
    childrenWithMother.some(person => women.name === person.mother));

  const momAge = mothers.reduce((a, cur) =>
    a + (cur.died - cur.born), 0) / mothers.length;

  return withChildren ? momAge : age;
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
  // write code here
  const child = people.filter(person =>
    people.some(women =>
      women.name === person.mother));
  const childAges = child.map(person =>
    person.born - people.find(women =>
      women.name === person.mother).born);
  const diff = childAges.reduce((acc, cur) => acc + cur) / child.length;

  const sons = people.filter(person =>
    people.some(son => person.mother === son.name) && person.sex === 'm');
  const sonsAges = sons.map(person =>
    person.born - people.find(son => son.name === person.mother).born);
  const sonsAgesDiff = sonsAges.reduce((acc, cur) => acc + cur) / sons.length;

  return onlyWithSon ? sonsAgesDiff : diff;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
