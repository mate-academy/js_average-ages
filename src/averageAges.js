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
  if (!century) {
    return calcAverageAge(filterGender(people, 'm'));
  } else {
    return calcAverageAge(filterGender(people, 'm')
      .filter(person => Math.ceil(person.died / 100) === century));
  }
}

function calcAverageAge(arr) {
  return arr.map(person => person.died - person.born)
    .reduce((sum, item) => item + sum, 0) / arr.length;
}

function calcAverage(arr) {
  return arr.reduce((sum, item) => item + sum, 0) / arr.length;
}

function filterGender(arr, gender) {
  return arr.filter(person => person.sex === gender);
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
  if (!withChildren) {
    return calcAverageAge(filterGender(people, 'f'));
  } else {
    return calcAverageAge(people.filter(mom => people
      .some(child => child.mother === mom.name)));
  }
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
  if (!onlyWithSon) {
    const filteredChildren = people
      .filter(child => people
        .some(mom => mom.name === child.mother));
    const childAgeDiff = filteredChildren.map(child =>
      child.born - (people.find(mom => mom.name === child.mother)).born);

    return calcAverage(childAgeDiff);
  } else {
    const filteredSons = people
      .filter(child => people
        .some(mom => (mom.name === child.mother && child.sex === 'm')));
    const sonsAgeDiff = filteredSons.map(child =>
      child.born - (people.find(person => child.mother === person.name)).born);

    return calcAverage(sonsAgeDiff);
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
