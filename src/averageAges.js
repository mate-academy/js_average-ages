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
  const sortedMens = people.filter(({ sex, died }) => {
    return century
      ? sex === 'm' && Math.ceil(died / 100) === century
      : sex === 'm';
  });

  const sumOfAge = sortedMens.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0);

  const average = sumOfAge / sortedMens.length;

  return average;
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
  const sortedWomens = people.filter(({ sex, name }) => {
    return withChildren
      ? sex === 'f' && people.some(({ mother }) => mother === name)
      : sex === 'f';
  });

  const sumOfAge = sortedWomens.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0);

  const average = sumOfAge / sortedWomens.length;

  return average;
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
  const diffAges = people
    .filter(({ mother, sex }) => {
      return onlyWithSon
        ? people.some(({ name }) => name === mother) && sex === 'm'
        : people.some(({ name }) => name === mother);
    })
    .map(({ mother, born }) => {
      return born - people.find(({ name }) => name === mother).born;
    });

  const sumOfDiffAges = diffAges.reduce((sum, diff) => sum + diff, 0);
  const average = sumOfDiffAges / diffAges.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
