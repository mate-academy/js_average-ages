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
  const menArr = century
    ? people.filter(item => item.sex === 'm'
      && Math.ceil(item.died / 100) === century)
    : people.filter(item => item.sex === 'm');

  const menAgeArr = menArr.map(item => item.died - item.born);
  const sumOfAge = menAgeArr.reduce((sum, age) => sum + age);

  return Math.round((sumOfAge / menAgeArr.length) * 100) / 100;
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
  const womenArr = withChildren
    ? people.filter(item => item.sex === 'f'
      && people.some(child => item.name === child.mother))
    : people.filter(item => item.sex === 'f');

  const womenAgeArr = womenArr.map(item => item.died - item.born);
  const sumOfAge = womenAgeArr.reduce((sum, age) => sum + age);

  return Math.round((sumOfAge / womenAgeArr.length) * 100) / 100;
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
  const womenArr
    = people.filter(item => item.sex === 'f'
    && people.some(child => item.name === child.mother));

  const childrenArr = onlyWithSon
    ? people.filter(child => womenArr
      .some(item => child.mother === item.name) && child.sex === 'm')
    : people.filter(child => womenArr
      .some(item => child.mother === item.name));

  const difference = childrenArr.map(child => {
    const findMother = womenArr.find(mother => child.mother === mother.name);

    return child.born - findMother.born;
  });

  const sumOfAge = difference.reduce((sum, age) => sum + age);

  return Math.round((sumOfAge / difference.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
