'use strict';

// const people = require("./people");

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

  return people
    .filter(person => person.sex === 'm')
    .filter(person => arguments.length > 1
      ? (Math.ceil(person.died / 100) === century)
      : person)
    .reduce((prev, person, index, array) => {
      return (index < array.length - 1)
        ? prev + (person.died - person.born)
        : (prev + (person.died - person.born)) / array.length;
    }, 0);
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
  return people
    .filter(person => person.sex === 'f')
    .filter(mother => withChildren
      ? people.some(someone => someone.mother === mother.name)
      : mother)
    .reduce((prev, person, index, array) => {
      return (index < array.length - 1)
        ? prev + (person.died - person.born)
        : (prev + (person.died - person.born)) / array.length;
    }, 0);
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
  const lol = people
    .filter(person => onlyWithSon
      ? person.sex === 'm'
      : person)
    .filter(child => people.some(mother => mother.name === child.mother))
    .reduce((prev, person, index, array) => {
      const moter = people.find(mother => mother.name === person.mother).born;

      return (index < array.length - 1)
        ? prev + person.born - moter
        : (prev + person.born - moter) / array.length;
    }, 0);

  return lol;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
