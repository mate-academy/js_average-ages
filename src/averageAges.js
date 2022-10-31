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
    ? people
      .filter((person) => person.sex === 'm')
      .filter(person => Math.ceil(person.died / 100) === century)
    : people.filter((person) => person.sex === 'm');

  const calcAverageAge = menArr.reduce((sum, year) => (year.died - year.born)
   + sum, 0) / menArr.length;

  return calcAverageAge;
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
  const womenArr = withChildren
    ? people
      .filter(person => person.sex === 'f')
      .filter(person => people.find(mom => mom.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const calcAverageAge = womenArr.reduce((sum, year) => (year.died - year.born)
   + sum, 0) / womenArr.length;

  return calcAverageAge;
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
  const childrenArr = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.find(mom => person.mother === mom.name))
    : people.filter(person => people.find(mom => person.mother === mom.name));

  const calcAgeDiff = childrenArr.map(child =>
    (child.born - people.find(mom => child.mother === mom.name).born));

  const calcAverageAgeDiff = calcAgeDiff.reduce((sum, diff) => diff
   + sum, 0) / calcAgeDiff.length;

  return calcAverageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
