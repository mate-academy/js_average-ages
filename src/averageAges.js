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
  const men = century
    ? people.filter(({ sex, died }) => (
      sex === 'm' && Math.ceil(died / 100) === century
    ))
    : people.filter(({ sex }) => sex === 'm');

  const menAges = men.reduce((a, { died, born }) => a + (died - born), 0);
  const menAvarageAges = menAges / men.length;

  return menAvarageAges;
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
  const women = withChildren
    ? people.filter(({ name }) => (
      people.some(({ mother }) => name === mother)))
    : people.filter(({ sex }) => sex === 'f');

  const womenAges = women.reduce((a, { died, born }) => a + (died - born), 0);
  const womenAvarageAges = womenAges / women.length;

  return womenAvarageAges;
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
  const children = onlyWithSon
    ? people.filter((child) =>
      child.sex === 'm'
      && people.some(mother => child.mother === mother.name))
    : people.filter((child) =>
      people.some(mother => child.mother === mother.name));

  const ages = children.map((child) =>
    child.born - people.find((mother) => mother.name === child.mother).born);

  const averageAges = ages.reduce((a, b) => a + b, 0) / children.length;

  return averageAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
