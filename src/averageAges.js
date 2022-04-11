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
  const man = (century === undefined) ? people.filter(({ sex }) => sex === 'm')
    : people.filter(({ sex, died }) =>
      sex === 'm' && Math.ceil(died / 100) === century);

  const age = man.map(({ born, died }) => died - born);
  const sumOfAge = age.reduce((prev, current) => prev + current, 0);

  return sumOfAge / age.length;
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
  const women = people.filter(({ sex }) => sex === 'f');
  const resultWomen = (withChildren === undefined) ? women
    : women.filter(woman =>
      (people.find(({ mother }) => mother === woman.name)));

  const age = resultWomen.map(({ born, died }) => died - born);
  const sumOfAge = age.reduce((prev, current) => prev + current, 0);

  return sumOfAge / age.length;
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
  const women = people.filter(({ sex }) => sex === 'f');
  const resultDifference = [];

  for (const woman of women) {
    const children = people.filter(({ mother }) => mother === woman.name);

    for (const child of children) {
      if (!onlyWithSon || child.sex === 'm') {
        resultDifference.push(child.born - woman.born);
      }
    }
  }

  const sum = resultDifference.reduce((prev, current) => prev + current, 0);

  return sum / resultDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
