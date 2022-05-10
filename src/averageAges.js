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
  const men = people.filter(man => century ? man.sex === 'm'
  && Math.ceil(man.died / 100) === century : man.sex === 'm');

  const manAge = men.map(man => man.died - man.born);

  return manAge.reduce((manA, manB) => manA + manB) / men.length;
}
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const women = people.filter(woman => withChildren ? woman.sex === 'f'
    && people.some(child => child.mother === woman.name) : woman.sex === 'f');

  const womanAge = women.map(woman => woman.died - woman.born);

  return womanAge.reduce((womanA, womanB) => womanA + womanB) / women.length;
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
  const women = people.filter(woman => woman.sex === 'f'
  && people.some(child => child.mother === woman.name));
  const children = people.filter(man => onlyWithSon ? man.sex === 'm'
  && people.some(person => man.mother === person.name)
    : people.some(person => man.mother === person.name));
  const diffAge = children.map(child =>
    child.born - women.find(person => person.name === child.mother).born
  );

  return diffAge.reduce((a, b) => a + b) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
