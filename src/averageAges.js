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
  const men = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);

  const years = men.map(person => person.died - person.born);
  const avAge = years.reduce((prev, cur) => prev + cur) / men.length;

  return avAge;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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

function isHaveChildren(people, womenName) {
  return people
    .map(person => person.mother === womenName)
    .includes(true);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => person.sex === 'f'
    && isHaveChildren(people, person.name));
  const dateOfBornAndDied = women.map(person => person.died - person.born);

  return dateOfBornAndDied.reduce((a, b) => a + b, 0) / women.length;
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
  const women = people.filter(person => person.sex === 'f');

  const children = !onlyWithSon
    ? people.filter(person => person.mother !== null)
    : people.filter(person => person.sex === 'm' && person.mother !== null);

  const ageDifferences = children
    .map(child => {
      const mother = women.find(woman => woman.name === child.mother);

      return mother ? child.born - mother.born : null;
    })
    .filter(diff => diff);

  const avAgeDiff = ageDifferences
    .reduce((prev, cur) => prev + cur) / ageDifferences.length;

  return avAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
