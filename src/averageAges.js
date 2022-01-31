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

  const searchedMen = century
    ? people.filter(person => (
      person.sex === 'm' && century === Math.ceil(person.died / 100)))
    : people.filter(person => person.sex === 'm');

  const menAgeList = searchedMen.map(person => person.died - person.born);

  return menAgeList.reduce((a, b) => a + b) / menAgeList.length;
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
  const searchedWomen = withChildren
    ? people.filter(person => (
      person.sex === 'f' && people.some(children => (
        children.mother === person.name))))
    : people.filter(person => person.sex === 'f');

  const womenAgeList = searchedWomen.map(person => person.died - person.born);

  return womenAgeList.reduce((a, b) => a + b) / womenAgeList.length;
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
  const searchMothers = onlyWithSon
    ? people.filter(person => (
      person.sex === 'f' && people.some(child => (
        child.mother === person.name && child.sex === 'm'))))
    : people.filter(person => (
      person.sex === 'f' && people.some(child => (
        child.mother === person.name))));

  const searchChildren = onlyWithSon
    ? people.filter((child) => (
      searchMothers.some((mother) => (
        child.mother === mother.name
        && child.sex === 'm'))))
    : people.filter((child) => (
      searchMothers.some((mother) => child.mother === mother.name)));

  const becomingMotherAge = searchChildren.map(child => (
    child.born - searchMothers.find(person => (
      person.name === child.mother)).born));

  return becomingMotherAge.reduce((a, b) => a + b) / becomingMotherAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
