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
 *
 */
function calculateAverage(array) {
  return array.reduce((a, b) => a + b, 0) / array.length;
}

function calculateMenAverageAge(people, century) {
  const mens = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  const age = mens.map(person => (person.died - person.born));

  return calculateAverage(age);
}

// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const women = people.filter(person =>
    withChildren
      ? people.some(child => child.mother === person.name)
      : person.sex === 'f');

  const age = women.map(person => (person.died - person.born));

  return calculateAverage(age);
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
  // let children = people.filter(person => people.some(someone => someone.name
  //   === person.mother));

  // if (onlyWithSon) {
  //   children = people.filter(person => person.sex === 'm')
  //     .filter(son => people.some(child => child.name === son.mother));
  // }
  const children = people.filter(person =>
    onlyWithSon
      ? (people.some(someone => person.mother === someone.name))
        && person.sex === 'm'
      : (people.some(child => person.mother === child.name))
  );

  const age = children.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born);

  return calculateAverage(age);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
