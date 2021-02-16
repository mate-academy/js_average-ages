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
  const age = [];

  if (century > 0) {
    const menArray = people.filter(item => item.sex === 'm');
    const senturyArray = menArray.filter(item =>
      Math.ceil(item.died / 100) === century);

    senturyArray.map(item => age.push(item.died - item.born));

    return age.reduce((acc, cur) => acc + cur, 0) / age.length;
  }

  people.filter(item =>
    item.sex === 'm').map(item => age.push(item.died - item.born));

  return age.reduce((acc, cur) => acc + cur, 0) / age.length;
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
  const women = people.filter(item => item.sex === 'f');
  const age = women.reduce((acc, cur) =>
    acc + (cur.died - cur.born), 0) / women.length;
  const isNull = null;
  const childrenWithMother = people.filter(item => item.mother !== isNull);
  const mothers = people.filter((item) =>
    childrenWithMother.some(i => item.name === i.mother));

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
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
