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
  const men = people.filter(({ sex }) => sex === 'm');

  const sortedMen = century
    ? men.filter(({ died }) => Math.ceil(died / 100) === century)
    : men;

  return sortedMen.reduce((sumOfAges, { died, born }) => {
    return sumOfAges + (died - born);
  }, 0) / sortedMen.length;
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
  const women = people.filter(({ sex }) => sex === 'f');

  const sortedWomen = withChildren
    ? women.filter(({ name }) =>
      people.some(({ mother }) => mother === name))
    : women;

  return sortedWomen.reduce((sumOfAges, { died, born }) => {
    return sumOfAges + (died - born);
  }, 0) / sortedWomen.length;
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

  const children = people.filter(({ mother }) => {
    return people.some(({ name }) => {
      return name === mother;
    });
  });

  const sortedChildren = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  return sortedChildren.reduce((sum, { born, mother }) => {
    return sum + born - people.find(({ name }) => name === mother).born;
  }, 0) / sortedChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
