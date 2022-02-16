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
  const arrayMan = (century)
    ? people.filter(item => item.sex === 'm'
    && Math.ceil(item.died / 100) === century)
    : people.filter(item => item.sex === 'm');

  const sumAge = arrayMan.reduce((prev, item) =>
    prev + (item.died - item.born), 0);

  return (sumAge) / arrayMan.length;
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
  const arrayWoman = (withChildren)
    ? people.filter((item, index, array) =>
      (array.some(itemChild => itemChild.mother === item.name)))
    : people.filter(item =>
      item.sex === 'f');
  const sumAge = arrayWoman.reduce((prev, item) =>
    prev + (item.died - item.born), 0);

  return sumAge / arrayWoman.length;
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
  const peopleWithChildren = people.filter(child =>
    onlyWithSon
      ? people.find(person => person.name === child.mother
        && child.sex === 'm')
      : people.find(person => person.name === child.mother));

  const ageDiff = peopleWithChildren.map(
    child => child.born - people.find(
      person => person.name === child.mother).born);

  const averageAgeDiff = ageDiff.reduce((allAges, age) =>
    allAges + age, 0) / ageDiff.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
