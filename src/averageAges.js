'use strict';

function findBirthYear(name, array) {
  for (const item of array) {
    if (name === item.name) {
      return item.born;
    }
  }
}

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
  const men = people.filter(person => person.sex === 'm');
  const centuryMen = men.filter(man => Math.ceil(man.died / 100) === century);
  const menNumber = men.length;
  const centuryMenNumber = centuryMen.length;

  const result = (century)
    ? centuryMen.reduce((totalAge, person) =>
      totalAge + (person.died - person.born), 0) / centuryMenNumber
    : men.reduce((totalAge, person) =>
      totalAge + (person.died - person.born), 0) / menNumber;

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
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = women.filter((woman) => {
    for (const person of people) {
      if (woman.name === person.mother) {
        return woman;
      }
    }

    return false;
  });

  const womenNumber = women.length;
  const womenWithChildrenNumber = womenWithChildren.length;

  const result = (withChildren)
    ? womenWithChildren.reduce((totalAge, person) =>
      totalAge + (person.died - person.born), 0) / womenWithChildrenNumber
    : women.reduce((totalAge, person) =>
      totalAge + (person.died - person.born), 0) / womenNumber;

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
  const children = people.filter((person, _, arr) =>
    arr.some(x => x.name === person.mother));

  const sons = children.filter(child => child.sex === 'm');

  const result = (onlyWithSon)
    ? sons.reduce((a, person) => a + (
      person.born - findBirthYear(person.mother, people)
    ), 0) / sons.length
    : children.reduce((a, person) => a + (
      person.born - findBirthYear(person.mother, people)
    ), 0) / children.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
