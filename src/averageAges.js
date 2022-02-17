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
  const menAges = people.filter(men =>
    century
      ? Math.ceil(men.died / 100) === century && men.sex === 'm'
      : (men.sex === 'm')
  );

  return menAges.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / menAges.length;
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
  const mothers = people.filter(person =>
    withChildren
      ? people.some(woman => woman.mother === person.name) && person.sex === 'f'
      : person.sex === 'f'
  );

  return mothers.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / mothers.length;
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
  const parents = people.filter(child =>
    onlyWithSon
      ? people.some(woman => child.mother === woman.name) && child.sex === 'm'
      : people.some(woman => child.mother === woman.name)
  );

  const ages = parents.map(child =>
    child.born - people.find(woman => woman.name === child.mother).born
  );

  return ages.reduce((a, b) => a + b) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
