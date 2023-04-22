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
  const men = people.filter((person) => person.sex === 'm');
  let sorted;

  if (century === undefined) {
    sorted = men;
  } else {
    sorted = men.filter((person) => (century === Math.ceil(person.died / 100)));
  }

  const sumOfYears = sorted.reduce((acc, person) => {
    const yearsLived = person.died - person.born;

    return acc + yearsLived;
  }, 0);

  return sumOfYears / sorted.length;
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
  const women = people.filter((person) => person.sex === 'f');
  let sorted = women;

  if (withChildren === true) {
    sorted = women.filter((person) => {
      return people.some(p => p.mother === person.name);
    });
  }

  const sumOfYears = sorted.reduce((acc, person) => {
    const yearsLived = person.died - person.born;

    return acc + yearsLived;
  }, 0);

  return sumOfYears / sorted.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const mothers = people.filter((person) => person.sex === 'f');
  let children;

  if (onlyWithSon) {
    children = people.filter((person) => person.sex === 'm');
  } else {
    children = people.filter((person) => person.mother !== undefined);
  }

  const diffs = children.map((child) => {
    const mother = mothers.find((person) => person.name === child.mother);

    if (mother !== undefined) {
      return child.born - mother.born;
    }
  }).filter((diff) => diff !== undefined);

  const sumOfDiffs = diffs.reduce((acc, diff) => acc + diff, 0);
  const avgDiff = sumOfDiffs / diffs.length;

  return avgDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
