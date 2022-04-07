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
  let man = people.filter(({ sex }) => sex === 'm');

  if (century !== undefined) {
    man = people.filter(({ sex, died }) =>
      sex === 'm' && Math.ceil(died / 100) === century);
  }

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
  const womenWithChildren = [];
  let resultWomen = women;

  if (withChildren !== undefined) {
    for (const item of women) {
      const child = people.find(({ mother }) => mother === item.name);

      if (child !== undefined) {
        womenWithChildren.push(item);
      }
    }
    resultWomen = womenWithChildren;
  }

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
  const differenceAge = [];
  const differenceAgeWithSon = [];
  let resultDifference = differenceAge;

  for (const item of women) {
    const children = people.filter(({ mother }) => mother === item.name);

    for (const child of children) {
      if (onlyWithSon !== undefined && child.sex === 'm') {
        differenceAgeWithSon.push(child.born - item.born);
        resultDifference = differenceAgeWithSon;
      }
      differenceAge.push(child.born - item.born);
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
