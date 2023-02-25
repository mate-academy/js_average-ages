/* eslint-disable max-len */
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
  const arrayOfMen = people.filter((person) => person.sex === 'm');

  function callback(sum, year) {
    return sum + year.died - year.born;
  }

  if (century === 0) {
    return arrayOfMen.reduce(callback, 0) / arrayOfMen.length;
  }

  const arrayOfMenInThisCentury
    = arrayOfMen.filter((year) => Math.ceil(year.died / 100) === century);

  // eslint-disable-next-line max-len
  return arrayOfMenInThisCentury.reduce(callback, 0) / arrayOfMenInThisCentury.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const arrayOfGirls = people.filter(person => person.sex === 'f');
  // eslint-disable-next-line max-len
  const arrayOfMothers = people.filter(person => person.sex === 'f' && people.find(child => child.mother === person.name));

  function callback(sum, year) {
    return sum + year.died - year.born;
  }

  if (withChildren === true) {
    return arrayOfMothers.reduce(callback, 0) / arrayOfMothers.length;
  }

  return arrayOfGirls.reduce(callback, 0) / arrayOfGirls.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  // eslint-disable-next-line max-len
  let arrayOfChildren = people.filter(person => person.sex === 'm' && people.find(mother => mother.sex === 'f' && mother.name === person.mother));

  if (onlyWithSon === false) {
    // eslint-disable-next-line max-len
    arrayOfChildren = people.filter(person => people.find(mother => mother.sex === 'f' && mother.name === person.mother));
  }

  // eslint-disable-next-line max-len
  const arrayOfMithersAgesBirth = arrayOfChildren.map(child => child.born - people[people.findIndex(mother => mother.name === child.mother)].born);

  function callback(sumOfAges, x) {
    return sumOfAges + x;
  }

  // eslint-disable-next-line max-len
  return Math.round(arrayOfMithersAgesBirth.reduce(callback, 0) / arrayOfMithersAgesBirth.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
