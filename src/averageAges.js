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
  const men = people.filter(({ sex, died }) => {
    return century
      ? sex === 'm' && Math.ceil(died / 100) === century
      : sex === 'm';
  });

  const menAgesSum = men.reduce(
    (acc, curr) => acc + (curr.died - curr.born), 0
  );

  const averageAge = menAgesSum / men.length;

  return +averageAge.toFixed(2);
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
  const women = people.filter((woman) => {
    return withChildren
      ? woman.sex === 'f'
        && people.some((person) => person.mother === woman.name)
      : woman.sex === 'f';
  });

  const womenAgesSum = women.reduce(
    (acc, curr) => acc + (curr.died - curr.born), 0
  );

  const averageAge = womenAgesSum / women.length;

  return +averageAge.toFixed(2);
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
  const women = people.filter((woman) => {
    return woman.sex === 'f'
      && people.some((person) => person.mother === woman.name);
  });

  const diffs = women.map((woman) => {
    const children = people.filter((person) => {
      return !onlyWithSon
        ? person.mother === woman.name
        : person.mother === woman.name && person.sex === 'm';
    });

    return children.map((child) => child.born - woman.born);
  }).flat();

  return +(diffs.reduce((acc, curr) => acc + curr, 0) / diffs.length)
    .toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
