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
  const mensFilter = people.filter(men =>
    century ? men['sex'] === 'm' && Math.ceil(men['died'] / 100) === century
      : men['sex'] === 'm');

  return mensFilter.map(men => men['died'] - men['born'])
    .reduce((a, b) => a + b) / mensFilter.length;
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
  const womenFilter = people.filter(women =>
    withChildren ? women['sex'] === 'f'
      && people.some(child => child['mother'] === women['name'])
      : women['sex'] === 'f');

  return womenFilter.map(women => women['died'] - women['born'])
    .reduce((a, b) => a + b) / womenFilter.length;
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
  let children = people.filter(child =>
    people.some((mother) => child['mother'] === mother['name']));

  if (onlyWithSon) {
    children = children.filter(child => child['sex'] === 'm');
  }

  return children.reduce((prev, child) => {
    const mothers = people.find((mother) => mother['name'] === child['mother']);

    return prev + (child['born'] - mothers['born']);
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
