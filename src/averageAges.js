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
  return century
    ? people
      .filter(person => person.sex === 'm')
      .filter(person => Math.ceil(person.died / 100) === century)
      .reduce((sum, person, index, array) =>
        sum + (person.died - person.born) / array.length, 0)
    : people
      .filter(person => person.sex === 'm')
      .reduce((sum, person, index, array) =>
        sum + (person.died - person.born) / array.length, 0);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  return withChildren
    ? people
      .filter(person => person.sex === 'f')
      .filter(person => people.some(child => child.mother === person.name))
      .reduce((sum, person, index, array) =>
        sum + (person.died - person.born) / array.length, 0)
    : people
      .filter(person => person.sex === 'f')
      .reduce((sum, person, index, array) =>
        sum + (person.died - person.born) / array.length, 0);
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
  const peopleSelection = onlyWithSon
    ? people.filter(child => child.sex === 'm')
    : people;

  return peopleSelection
    .filter(child => people.some(mother => mother.name === child.mother))
    .map(child => {
      return child.born - people.find(mother => {
        return mother.name === child.mother;
      }).born;
    })
    .reduce((sum, elem, index, array) => sum + elem / array.length, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
