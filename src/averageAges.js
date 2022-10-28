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
  const getListMen = people.filter(person => person.sex === 'm', 0);

  const listToCalculate = century
    ? getListMen.filter(
      person => Math.ceil(person.died / 100) === century)
    : getListMen;

  const getMenAges = listToCalculate.map((person) => person.died - person.born);

  return getMenAges.reduce((total, item) => total + item) / getMenAges.length;
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
  const listToCalculate = withChildren
    ? people.filter(
      person => person.sex === 'f' && people.some(
        child => child.mother === person.name))
    : people.filter(person => person.sex === 'f', 0);

  const getWomenAges = listToCalculate.map(
    (person) => person.died - person.born);

  return getWomenAges.reduce(
    (total, item) => total + item) / getWomenAges.length;
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
  const listToCalculate = onlyWithSon
    ? people.filter(
      child => people.find(
        person => person.name === child.mother) && child.sex === 'm')
    : people.filter(
      child => people.find(person => person.name === child.mother));

  const getDifferenceAge = listToCalculate.map(
    child => child.born - people.find(
      mother => child.mother === mother.name).born);

  return getDifferenceAge.reduce(
    (total, item) => total + item) / getDifferenceAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
