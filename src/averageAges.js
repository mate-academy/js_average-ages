/* eslint-disable no-unused-expressions */
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
  let peopleArray = people;

  century || 0 ? peopleArray = (peopleArray.filter(persone =>
    Math.ceil(persone.died / 100) === century)) : 0;

  const men = (peopleArray.filter(persone => persone.sex === 'm'));
  const ages = men.map((persone) => persone.died - persone.born);
  const menAverageAge = ages.reduce((sum, i) => sum + i) / ages.length;

  return menAverageAge;
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
  let women = (people.filter(persone => persone.sex === 'f'));

  withChildren || 0 ? women = women.filter(persone =>
    people.find(children =>
      children.mother === persone.name)) : 0;

  const ages = women.map((persone) => persone.died - persone.born);
  const womenAverageAge = ages.reduce((sum, i) => sum + i) / ages.length;

  return womenAverageAge;
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
  let women = people.filter(woman =>
    people.find(child => child.mother === woman.name));

  onlyWithSon || 0 ? women = people.filter(woman =>
    people.find(child => child.mother === woman.name && child.sex === 'm')) : 0;

  let children = people.filter(child =>
    people.find(woman => woman.name === child.mother));

  onlyWithSon || 0 ? children = children.filter(child => child.sex === 'm') : 0;

  const agesDiff = children.map(child =>
    (child.born - women.find(woman =>
      child.mother === woman.name).born));

  const averageAgeDiff = agesDiff.reduce((sum, age) =>
    sum + age) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
