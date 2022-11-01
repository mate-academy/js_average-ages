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

  let men = [];

  century
    ? men = people.filter(
      person =>
        person.sex === 'm'
        && Math.ceil(person.died / 100) === century
    )
    : men = people.filter(person => person.sex === 'm');

  men = men.map(person => (person.age = person.died - person.born));

  return men.reduce((a, b) => a + b) / men.length;
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
  const mothers = [];

  people.forEach(person => mothers.push(person.mother));

  let women = [];

  withChildren
    ? women = people.filter(
      person =>
        person.sex === 'f'
        && mothers.includes(person.name)
    )
    : women = people.filter(person => person.sex === 'f');

  women = women.map(person => (person.age = person.died - person.born));

  return women.reduce((a, b) => a + b) / women.length;
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
  const children = !onlyWithSon
    ? people.filter(child =>
      (people.find(person => child.mother === person.name))
    )
    : people.filter(child =>
      (people.find(person => child.mother === person.name && child.sex === 'm'))
    );

  const ageDiff = children.map(child => (
    child.born - people.find(person => (
      person.name === child.mother)).born));

  return ageDiff.reduce((a, b) => a + b) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
