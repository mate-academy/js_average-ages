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
  const filtredSex = people.filter(person => person.sex === 'm');

  if (century) {
    const filtredCentury = filtredSex
      .filter(person => Math.ceil(person.died / 100) === century);

    return filtredCentury
      .reduce((acc, value) =>
        acc + (value.died - value.born), 0) / filtredCentury.length;
  } else {
    return filtredSex.reduce((acc, value) =>
      acc + (value.died - value.born), 0) / filtredSex.length;
  }
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
  const filtred = people.filter(person => person.sex === 'f');
  const searchMother = people.map(person => person.mother);

  if (!withChildren) {
    return filtred.reduce((acc, value) =>
      acc + (value.died - value.born), 0) / filtred.length;
  } else {
    const personSexF = people
      .filter(mother => searchMother.includes(mother.name));

    return personSexF.reduce((acc, value) =>
      acc + (value.died - value.born), 0) / personSexF.length;
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
  const childrenSearch = people.filter(child => onlyWithSon
    ? people.some(mother => mother.name === child.mother) && child.sex === 'm'
    : people.some(mother => mother.name === child.mother));

  const ageDiff = childrenSearch
    .map(child => child.born - people
      .find(mother => child.mother === mother.name).born);

  return ageDiff
    .reduce((acc, current) => acc + current) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
