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
  const speacialMen = people.filter(person =>
    Math.ceil(person.died / 100) === century && person.sex === 'm');

  const speacialSum = speacialMen.reduce((sum, { died, born }) =>
    (sum + (died - born)), 0);

  const allMen = people.filter(person => person.sex === 'm');

  const generalSum = allMen.reduce((sum, { died, born }) =>
    (sum + (died - born)), 0);

  return arguments.length === 2
    ? speacialSum / speacialMen.length
    : generalSum / allMen.length;
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
  const allWomen = people.filter(person => person.sex === 'f');

  const age = allWomen.reduce((sum, { died, born }) =>
    (sum + (died - born)), 0);

  const womenWithChildren = people.filter(person =>
    person.sex === 'f' && people.find(woman => woman.mother === person.name));

  const difference = womenWithChildren.reduce((sum, { died, born }) =>
    sum + (died - born), 0);

  return withChildren === true
    ? difference / womenWithChildren.length
    : age / allWomen.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child
 * and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age
 * difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const menChildren = people.filter(child =>
    people.find(person => person.name === child.mother
      && child.sex === 'm'));

  const allChildren = people.filter(child =>
    people.find(person => person.name === child.mother));

  const menAgeDifference = menChildren.reduce((sum, child) =>
    sum + (child.born
      - people.find(person => child.mother === person.name).born), 0);

  const allAgeDifference = allChildren.reduce((sum, child) =>
    sum + (child.born
      - people.find(person => child.mother === person.name).born), 0);

  return onlyWithSon === true
    ? menAgeDifference / menChildren.length
    : allAgeDifference / allChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
