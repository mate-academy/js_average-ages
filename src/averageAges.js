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
function calculateMenAverageAge(people, century = 0) {
  let onlyMen = people.filter(item => item.sex === 'm');

  onlyMen = century > 0
    ? onlyMen.filter(
      item => Math.ceil(item.died / 100) === century)
    : onlyMen;

  const sumAge = onlyMen.reduce((accum, curVal) => {
    return accum + (curVal.died - curVal.born);
  }, 0);

  return sumAge / onlyMen.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let onlyWomen = people.filter(item => item.sex === 'f');

  onlyWomen = withChildren === true
    ? onlyWomen.filter(item => people
      .some(person => item.name === person.mother))
    : onlyWomen;

  const sumAge = onlyWomen.reduce((accum, curVal) => {
    return accum + (curVal.died - curVal.born);
  }, 0);

  return sumAge / onlyWomen.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const onlyMothers = people
    .filter(item => item.sex === 'f')
    .filter(item => people
      .some(person => item.name === person.mother));

  let children = people.filter(item =>
    onlyMothers.some(mother => item.mother === mother.name));

  children = onlyWithSon === true
    ? children.filter(child => child.sex === 'm')
    : children;

  let ages = 0;
  children.map(child => onlyMothers.map(mother => {
    if (child.mother === mother.name) {
      ages += child.born - mother.born;
    }
  }));

  return ages / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
