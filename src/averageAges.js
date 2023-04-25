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

  // eslint-disable-next-line max-len
  const sorted = men.filter((person) => century === undefined ? true : century === Math.ceil(person.died / 100));

  const sumOfYears = sorted.reduce((acc, person) => {
    const yearsLived = person.died - person.born;

    return acc + yearsLived;
  }, 0);

  return avg(sumOfYears, sorted.length);
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
  // eslint-disable-next-line max-len
  const sorted = withChildren ? women.filter((person) => people.some(p => p.mother === person.name)) : women;

  const sumOfYears = sorted.reduce((acc, person) => {
    const yearsLived = person.died - person.born;

    return acc + yearsLived;
  }, 0);

  return avg(sumOfYears, sorted.length);
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
  let children;

  if (onlyWithSon) {
    children = people.filter((person) => person.sex === 'm');
  } else {
    children = people.filter((person) => person.mother !== undefined);
  }

  const diffs = children.map((child) => {
    const mother = people.find((person) => person.name === child.mother);

    if (mother !== undefined) {
      return child.born - mother.born;
    }
  }).filter((diff) => diff !== undefined);

  const sumOfDiffs = diffs.reduce((acc, diff) => acc + diff, 0);

  return avg(sumOfDiffs, diffs.length);
}

function avg(a, b) {
  return a / b;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
