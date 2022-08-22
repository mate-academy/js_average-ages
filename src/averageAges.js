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
    ? people.filter(person => Math.ceil(person.died / 100) === century
      && person['sex'] === 'm')
    : people.filter(person => person['sex'] === 'm');

  return men
    .map(person => person['died'] - person['born'])
    .reduce((sum, current) => sum + current, 0) / men.length;
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
    ? people.filter(woman =>
      people.some(person => person['mother'] === woman['name']))
    : people.filter(person => person['sex'] === 'f');

  return women
    .map(person => person['died'] - person['born'])
    .reduce((sum, current) => sum + current, 0) / women.length;
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
    ? people.filter(child =>
      people.some(person => child['mother'] === person['name'])
      && child['sex'] === 'm')
    : people.filter(child =>
      people.some(person => child['mother'] === person['name']));

  return children
    .map(child => {
      const mather = people.find(person => child['mother'] === person['name']);

      return child['born'] - mather['born'];
    })
    .reduce((sum, current) => sum + current, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
