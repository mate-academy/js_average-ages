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
  return onlyMens(people, century)
    .map(men => men.died - men.born)
    .reduce((acc, curVal) => acc + curVal) / onlyMens(people, century).length;
}

function onlyMens(people, century) {
  return people.filter(person => person.sex === 'm')
    .filter(men => century
      ? Math.ceil(men.died / 100) === century
      : men);
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
function onlyWomens(people) {
  return people.filter(person => person.sex === 'f');
}

function calculateWomenAverageAge(people, withChildren) {
  const womens = onlyWomens(people)
    .filter(women => withChildren
      ? people.find(child => child.mother === women.name)
      : women)
    .map(women => women.died - women.born);

  return womens.reduce((acc, curentValue) => acc + curentValue) / womens.length;
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
function childsFilter(people, onlyWithSon) {
  return people.filter(child => people
    .find(mother => child.mother === mother.name))
    .filter(child => onlyWithSon ? child.sex === 'm' : child);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childsQuantity = childsFilter(people, onlyWithSon).length;

  return childsFilter(people, onlyWithSon)
    .map(child => child.born - people
      .find(mom => mom.name === child.mother).born)
    .reduce((acc, curVal) => acc + curVal) / childsQuantity;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
