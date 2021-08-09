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
  const menCentury = men.filter(({ died }) => {
    return Math.ceil(died / 100) === century;
  });
  const filteredMen = century !== undefined ? menCentury : men;
  const age = filteredMen.map(x => x.died - x.born);

  return age.reduce((a, b) => a + b) / age.length;
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
  const womenWithChild = people.filter(({ name }) => {
    return people.some(({ mother }) => name === mother);
  });
  const filteredWomen = withChildren !== undefined ? womenWithChild : women;
  const age = filteredWomen.map(x => x.died - x.born);

  return age.reduce((a, b) => a + b) / age.length;
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
    return people.some(({ name }) => name === mother);
  });
  const onlySon = children.filter(({ sex }) => sex === 'm');
  const filteredPeople = onlyWithSon !== undefined ? onlySon : children;
  const difference = filteredPeople.map(x => {
    return x.born - people.find(({ name }) => name === x.mother).born;
  });

  return difference.reduce((a, b) => a + b) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
