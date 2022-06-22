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

  const filtredMan = people.filter(item => item.sex === 'm');
  const filterByDied = century
    ? filtredMan.filter(item => Math.ceil(item.died / 100) === century)
    : filtredMan;

  const average = filterByDied.reduce((previousValue, currentValue) =>
    currentValue.died - currentValue.born + previousValue, 0)
    / filterByDied.length;

  return average;
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
  const filtredWomen = people.filter(item => item.sex === 'f');

  const womenWithChild = withChildren
    ? filtredWomen.filter(
      ({ name }) => people.some(({ mother }) => mother === name))
    : filtredWomen;

  const averageWomen = womenWithChild.reduce((previousValue, currentValue) =>
    currentValue.died - currentValue.born + previousValue, 0)
  / womenWithChild.length;

  return averageWomen;
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
  const children = people.filter(item =>
    people.some(person => item.mother === person.name));
  const filtredChildren = onlyWithSon
    ? children.filter(person => person.sex === 'm')
    : children;
  const averagseAgesChildren = filtredChildren.reduce(
    (previousValue, currentValue) =>
      (currentValue.born - people.find(
        mom => currentValue.mother === mom.name).born) + previousValue, 0)
/ filtredChildren.length;

  return averagseAgesChildren;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
