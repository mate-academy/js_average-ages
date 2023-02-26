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
  const men = people.filter(person => person.sex === 'm');

  const menInCentury = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  const sumOfAges = menInCentury
    .reduce((total, person) => total + (person.died - person.born), 0);

  return sumOfAges / menInCentury.length;
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
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = withChildren
    ? women.filter(woman => people.some(person => person.mother
      === woman.name
    ))
    : women;
  const sumOfAges = womenWithChildren
    .reduce((total, woman) => total + (woman.died - woman.born), 0);

  return sumOfAges / womenWithChildren.length;
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
    ? people.filter(person => person.sex === 'm')
    : people;

  const diffs = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    if (mother) {
      return child.born - mother.born;
    } else {
      return undefined;
    }
  }).filter(diff => diff !== undefined);

  const sumOfDiffs = diffs.reduce((total, diff) => {
    return total + diff;
  }, 0);

  return sumOfDiffs / diffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
