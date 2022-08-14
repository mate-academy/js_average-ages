'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of x's death by 100: Math.ceil(x.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const mens = !century
    ? people.filter(x => x.sex === 'm')
    : people.filter(x =>
      x.sex === 'm' && Math.ceil(x.died / 100) === century);

  return mens.reduce((total, men) =>
    total + (men.died - men.born), 0) / mens.length;
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
  const womens = !withChildren
    ? people.filter(x => x.sex === 'f')
    : people.filter(x => x.sex === 'f'
    && (people.find(children => x.name === children.mother)));

  return womens.reduce((total, women) =>
    total + (women.died - women.born), 0) / womens.length;
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
  const diff = !onlyWithSon
    ? people.filter(child =>
      people.find(mother => child.mother === mother.name))
    : people.filter(child =>
      people.find(mother => child.mother === mother.name) && child.sex === 'm');

  return diff.reduce((total, child) =>
    total + (child.born - people.find(mother =>
      child.mother === mother.name).born), 0) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
