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
  let men;

  century
    ? men = people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : men = people.filter(person => person.sex === 'm');

  const mAvgAge = (men.reduce((prev, current) =>
    prev + (current.died - current.born), 0)) / men.length;

  return mAvgAge;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = people.filter(woman =>
      people.some(child => child.mother === woman.name));
  }

  const fAvgAge = (women.reduce((prev, current) =>
    prev + (current.died - current.born), 0)) / women.length;

  return fAvgAge;
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
  let children = people.filter(child =>
    people.some(mother => mother.name === child.mother));

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  const avgAgeDiff = (children.reduce((prev, child) =>
    prev + (child.born - people.find(person =>
      person.name === child.mother).born), 0)) / children.length;

  return avgAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
