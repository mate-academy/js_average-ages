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

  const man = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const age = man.map((words) => words.died - words.born)
    .reduce((sum, x) => sum + x, 0) / man.length;

  return age;
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
  // write code here
  const woman = people.filter((person) => withChildren
    ? person.sex === 'f' && people.some((child) => child.mother === person.name)
    : person.sex === 'f'
  );

  const age = woman.map((words) => words.died - words.born)
    .reduce((a, b) => a + b, 0) / woman.length;

  return age;
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
  // write code here
  const woman = people.filter((words) => words.sex === 'f'
  && people.some((child) => child.mother === words.name));

  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people
      .some((mother) => person.mother === mother.name)
    : people.some((mother) => person.mother === mother.name));

  const age = children.map(child =>
    child.born - woman.find((mother) => mother.name === child.mother).born);

  return age.reduce((a, b) => a + b, 0) / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
