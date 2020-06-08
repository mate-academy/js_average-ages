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

  const men = people.filter(gender => gender.sex === 'm');

  const menCentury = men.filter(person => century !== undefined
    ? Math.ceil(person.died / 100) === century
    : true);

  const avarageAge = menCentury.map(person => person.died - person.born);

  return avarageAge.reduce((sum, index) => sum + index) / avarageAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here

  const woman = withChildren
    ? people.filter(women => women.sex === 'f' && people.some(person =>
      person.mother === women.name))
    : people.filter(gender => gender.sex === 'f');

  const avarageAge = woman.map(person => person.died - person.born);

  return avarageAge.reduce((sum, index) => sum + index) / avarageAge.length;
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

  const women = people.filter(gender => gender.sex === 'f');

  const womenWithChildren = onlyWithSon
    ? women.filter(woman => people.some(person =>
      person.sex === 'm' && person.mother === woman.name))
    : women.filter(woman => people.some(person =>
      person.mother === woman.name));

  const children = onlyWithSon
    ? people.filter(child => child.sex === 'm' && women.some(person =>
      child.mother === person.name))
    : people.filter(child => women.some(person =>
      person.name === child.mother));

  const avarageAge = children.map(child =>
    child.born - womenWithChildren.find(mother =>
      mother.name === child.mother).born);

  return avarageAge.reduce((sum, index) => sum + index) / avarageAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
