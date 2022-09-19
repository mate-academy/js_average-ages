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

  const men = (Number.isInteger(century))
    ? people.filter(person => (person.sex === 'm'
    && Math.ceil(person.died / 100) === century))
    : people.filter(person => person.sex === 'm');

  const ageDiedSum = men.reduce((prev, person) => prev + person.died, 0);
  const ageBornSum = men.reduce((prev, person) => prev + person.born, 0);

  return (ageDiedSum - ageBornSum) / men.length;
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

  const women = (withChildren)
    ? people.filter(person => getWomenWithChildren(people, person))
    : people.filter(person => person.sex === 'f');

  const ageDiedSum = women.reduce((prev, person) => prev + person.died, 0);
  const ageBornSum = women.reduce((prev, person) => prev + person.born, 0);

  return (ageDiedSum - ageBornSum) / women.length;
}

function getWomenWithChildren(people, person) {
  return people.some(child => child.mother === person.name);
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
  const children = (onlyWithSon)
    ? people.filter(child => getChildren(people, child) && child.sex === 'm')
    : people.filter(child => getChildren(people, child));

  const ages = children.map(child => getDiffAge(children, people, child));

  return ages.reduce((prev, age) => prev + age) / children.length;
}

function getChildren(people, child) {
  return people.some(mother => child.mother === mother.name);
}

function getDiffAge(children, people, child) {
  const motherBirth = people.find(mother => mother.name === child.mother);

  return child.born - motherBirth.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
