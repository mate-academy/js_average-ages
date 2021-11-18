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
  const menFilter = people.filter((men) =>
    century
      ? men.sex === 'm' && Math.ceil(men.died / 100) === century
      : men.sex === 'm'
  );

  const averageAge = menFilter.reduce((value, men) => (
    value + (men.died - men.born)
    ), 0) / menFilter.length;

  return averageAge;
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
  const womenFilter = people.filter((women) =>
    withChildren
      ? women.sex === 'f' && people.some(child => child.mother === women.name)
      : women.sex === 'f'
  );

  const averageAge = womenFilter.reduce((value, women) =>
    value + (women.died - women.born
    ), 0) / womenFilter.length;

  return averageAge;
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
  const children = people.filter(child => people.some(mother =>
    child.mother === mother.name));
  const sons = children.filter((son) => son.sex === 'm');

  const array = onlyWithSon ? sons : children;

  return array.reduce((previous, child) => {
    const motherDiff = people.find((mother) => child.mother === mother.name);

    return previous + (child.born - motherDiff.born);
  }, 0) / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
