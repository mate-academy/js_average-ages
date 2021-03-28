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

  // const men = people.filter((person) => person.sex === 'm');

  const result = (century)
    ? people.filter((person) => person.sex === 'm'
    && century === Math.ceil(person.died / 100))
      .reduce((sum, person) => sum + (person.died - person.born), 0)
    / people.filter((person) => person.sex === 'm'
    && century === Math.ceil(person.died / 100)).length
    : people.filter((person) => person.sex === 'm')
      .reduce((sum, person) => sum + (person.died - person.born), 0)
  / people.filter((person) => person.sex === 'm').length;

  return result;
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
  // write code here

  const result = (withChildren)
    ? people.filter((person) => person.sex === 'f'
    && people.some(child => person.name === child.mother))
      .reduce((sum, woman) => sum + (woman.died - woman.born), 0)
    / people.filter(person => person.sex === 'f'
    && people.some(child => person.name === child.mother)).length
    : people.filter((person) => person.sex === 'f')
      .reduce((sum, person) => sum + (person.died - person.born), 0)
  / people.filter(person => person.sex === 'f').length;

  return result;
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
  // write code here
  let children = people.filter((person) => person.mother !== undefined);

  children = (onlyWithSon)
    ? children.filter(child => child.sex === 'm')
    : children;

  const callback = (child) => {
    const mother = people.find((person) => person.name === child.mother);

    return (mother !== undefined) ? child.born - mother.born : 0;
  };

  const agesDifference = children.map(callback).filter(age => age > 0);

  const result = agesDifference.reduce((sum, age) =>
    sum + age, 0) / agesDifference.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
