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
  const men = century
    ? people.filter(info => info.sex === 'm'
      && Math.ceil(info.died / 100) === century)
    : people.filter(info => info.sex === 'm');

  return men.map(date => date.died - date.born)
    .reduce((sum, yearLife) => sum + yearLife) / men.length;

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
function calculateWomenAverageAge(people, withChildren) {
  const woman = withChildren
    ? people.filter(info => info.sex === 'f'
      && people.some(child => child.mother === info.name))
    : people.filter(info => info.sex === 'f');

  return woman.map(date => date.died - date.born)
    .reduce((sum, yearLife) => sum + yearLife) / woman.length;
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
  const children = onlyWithSon
    ? people.filter(person =>
      people.some(mother => person.mother === mother.name
        && person.sex === 'm'))
    : people.filter(person =>
      people.some(mother => person.mother === mother.name));

  return children.map(child => (child.born
    - people.find(mother => child.mother === mother.name).born))
    .reduce((sum, ageFind) => sum + ageFind, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
