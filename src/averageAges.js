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
  const man = (person) => (person.sex === 'm');
  const manWithCenturyOption = (person) => (man(person)
    && Math.ceil(person.died / 100) === century);
  const allMen = people.filter(century ? manWithCenturyOption : man);

  return allMen.reduce((a, b) => a + (b.died - b.born), 0) / allMen.length;
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
  const woman = (person) => (person.sex === 'f');
  const womanHasChildren = (person) => (woman(person)
    && people.some(child => person.name === child.mother));

  const allWomen = people.filter(withChildren ? womanHasChildren : woman);

  return allWomen.reduce((a, b) => a + (b.died - b.born), 0) / allWomen.length;
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
  const child = (person) => (people.some(a => person.mother === a.name));

  const son = (person) => (person.sex === 'm' && child(person));

  const children = people.filter(onlyWithSon ? son : child);

  const mothers = people.filter(person => children.some(kid =>
    kid.mother === person.name));

  const findMother = (kid) => (mothers.find(mother =>
    kid.mother === mother.name));

  return children.reduce((sum, kid) =>
    sum + (kid.born - findMother(kid).born), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
