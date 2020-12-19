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
  let men;

  if (arguments.length > 1) {
    men = people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);
  } else {
    men = people.filter(person => person.sex === 'm');
  }

  return +(men.reduce((sum, person) => sum + (person.died - person.born), 0)
    / men.length)
    .toFixed(2);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women;

  if (arguments.length > 1) {
    if (withChildren) {
      women = people.filter(person => person.sex === 'f'
      && people.some(x => x.mother === person.name));
    }
  } else {
    women = people.filter(person => person.sex === 'f');
  }

  return +(women.reduce((sum, person) => sum + (person.died - person.born), 0)
    / women.length)
    .toFixed(2);
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
  const mom = people.filter(person => person.sex === 'f'
    && people.some(x => x.mother === person.name));
  let child;

  if (arguments.length > 1) {
    if (onlyWithSon) {
      child = people.filter(person => person.sex === 'm'
        && mom.some(x => x.name === person.mother));
    }
  } else {
    child = people.filter(person => mom.some(x => x.name === person.mother));
  }

  return +(child.reduce((sum, person) => sum
    + person.born
    - mom.find(mother => mother.name === person.mother).born, 0
  ) / child.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
