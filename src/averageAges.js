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
  const menAge = [];

  people.filter(men => men.sex === 'm'
    ? menAge.push(men.died - men.born)
    : men);

  const menAgeCentury = [];

  people.filter(men => men.sex === 'm'
    && Math.ceil(men.died / 100) === century
    ? menAgeCentury.push(men.died - men.born)
    : men);

  return !century
    ? menAge.reduce((a, b) => a + b) / menAge.length
    : menAgeCentury.reduce((a, b) => a + b) / menAgeCentury.length;
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
  const womanAge = [];

  people.filter(woman => woman.sex === 'f'
    ? womanAge.push(woman.died - woman.born)
    : woman);

  const womanAgeWithChild = [];

  people.filter(woman => woman.sex === 'f'
    && people.some(y => woman.name === y.mother)
    ? womanAgeWithChild.push(woman.died - woman.born)
    : woman);

  return !withChildren
    ? womanAge.reduce((a, b) => a + b) / womanAge.length
    : womanAgeWithChild.reduce((a, b) => a + b) / womanAgeWithChild.length;
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
  const mothersAge = [];

  people.filter(mother => mother.sex === 'f'
    && people.some(child => mother.name === child.mother)
    ? people.filter(child => mother.name === child.mother
      ? mothersAge.push(child.born - mother.born)
      : child)
    : mother);

  const mothersAgeWithSon = [];

  people.filter(son => son.sex === 'm'
    && people.some(mother => mother.name === son.mother)
    ? people.filter(mother => mother.name === son.mother
      ? mothersAgeWithSon.push(son.born - mother.born)
      : mother)
    : son);

  return !onlyWithSon ? mothersAge.reduce((a, b) => a + b) / mothersAge.length
    : mothersAgeWithSon.reduce((a, b) => a + b) / mothersAgeWithSon.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
