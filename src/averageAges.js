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

  const menAges = people.filter(person => century
    ? century === Math.ceil(person.died / 100) && person.sex === 'm'
    : person.sex === 'm'
  ).map(man => man.died - man.born);

  return menAges.reduce((sum, value) => sum + value) / menAges.length;
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
  const womenAges = people.filter(human => withChildren
    ? people.some(person => person.mother === human.name)
      && human.sex === 'f'
    : human.sex === 'f'
  ).map(human => human.died - human.born);

  return womenAges.reduce((sum, value) => sum + value) / womenAges.length;
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
  const womenAges = people.filter(human => onlyWithSon
    ? human.sex === 'm'
      && people.some(mom => human.mother === mom.name)
    : people.some(mom => human.mother === mom.name)
  ).map(child => child.born
    - people.find(mom => child.mother === mom.name).born);

  return womenAges.reduce((sum, value) => sum + value) / womenAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
