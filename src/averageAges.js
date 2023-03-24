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
  const countMale = people.filter(isMan => isMan.sex === 'm');

  const result = century
    ? countMale.filter(cent => Math.ceil(cent.died / 100) === century)
    : countMale;

  const sumAge = result.reduce((accum, maleAge) => (
    accum + (maleAge.died - maleAge.born)
  ), 0);

  return sumAge / result.length;
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
  const countFemale = people.filter(isWoman => isWoman.sex === 'f');

  const isMom = withChildren ? (
    countFemale
      .filter(name => people.some(isMother => isMother.mother === name.name))
  ) : countFemale;

  const sumFemale = isMom.reduce(
    (accum, age) => (
      accum + (age.died - age.born)
    ), 0);

  return sumFemale / isMom.length;
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
  // All I want is to drown in my tears...
  const countChild = people
    .filter(isMom => isMom.mother && people
      .some(person => person.name === isMom.mother));

  const isSonExist = onlyWithSon
    ? countChild.filter(el => el.sex === 'm')
    : countChild;

  const ageKids = isSonExist
    .map(person => person.born - people
      .find(mother => mother.name === person.mother).born);

  const ageDiff = ageKids.reduce((accumaltor, age) => (
    accumaltor + age
  ), 0);

  return ageDiff / ageKids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
