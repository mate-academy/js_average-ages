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
  const mans = people.filter(oneMan => century
    ? century === Math.ceil(oneMan.died / 100) && oneMan.sex === 'm'
    : oneMan.sex === 'm');

  const agesSum = mans.reduce((prev, { died, born }) => {
    return prev + died - born;
  }, 0);

  return agesSum / mans.length;
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
  const womens = people.filter(oneWomen => withChildren
    ? people.find(item => item.mother === oneWomen.name)
      && oneWomen.sex === 'f'
    : oneWomen.sex === 'f');

  const agesSum = womens.reduce((prev, { born, died }) => {
    return prev + died - born;
  }, 0);

  return agesSum / womens.length;
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
  const childs = people.filter(child => onlyWithSon
    ? people.find(item => item.name === child.mother && child.sex === 'm')
    : people.find(item => item.name === child.mother));

  const agesDiff = childs.map((child) => child.born - people.find((women) =>
    women.name === child.mother).born);

  const agesSum = agesDiff.reduce((a, b) => a + b, 0);

  return agesSum / childs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
