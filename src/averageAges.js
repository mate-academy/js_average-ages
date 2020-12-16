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
  const allMen = people.filter(item => item.sex === 'm');
  const menForNeedCentury = allMen.filter(person =>
    Math.ceil(person.died / 100) === century);
  const countAges = menForNeedCentury.length;
  const countAllAges = allMen.length;

  return century !== undefined
    ? menForNeedCentury
      .map(item => item.died - item.born)
      .reduce((sum, a) => sum + a) / countAges
    : allMen
      .map(item => item.died - item.born)
      .reduce((sum, a) => sum + a) / countAllAges;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter(item => item.sex === 'f');
  const womenWithKids = allWomen.filter(item =>
    people.some(value => value.mother === item.name));

  return withChildren
    ? womenWithKids
      .map(item => item.died - item.born)
      .reduce((sum, a) => sum + a) / womenWithKids.length
    : allWomen
      .map(item => item.died - item.born)
      .reduce((sum, a) => sum + a) / allWomen.length;
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
  // for all kids
  const peopleHaveMother = people.filter(person =>
    people.some(mother => mother.name === person.mother));
  const arrAgeDiff = peopleHaveMother.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);
  const sumAllAgesDiff = arrAgeDiff.reduce((sum, e) => sum + e, 0);
  // only for sons
  const menHaveMother = people.filter(person =>
    people.some(mother => mother.name === person.mother && person.sex === 'm'));
  const sonsAgeDiff = menHaveMother.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);
  const sumSonsAgesDiff = sonsAgeDiff.reduce((sum, e) => sum + e, 0);

  return onlyWithSon
    ? sumSonsAgesDiff / sonsAgeDiff.length
    : +(sumAllAgesDiff / arrAgeDiff.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
