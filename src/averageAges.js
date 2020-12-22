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
  const arrMen = people
    .filter(person => person.sex === 'm')
    .filter(person => Math.ceil(person.died / 100) === century || !century)
    .map(person => person.died - person.born);

  const sumAge = arrMen.reduce((prev, currentValue) => {
    return prev + currentValue;
  }, 0);

  const averAge = sumAge / arrMen.length;

  return averAge;
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
  // write code here

  const arrWomen = people
    .filter(person => person.sex === 'f')
    .filter(woman => people.some(child =>
      child.mother === woman.name) || !withChildren)
    .map(person => person.died - person.born);

  const sumAge = arrWomen.reduce((prev, currentValue) => {
    return prev + currentValue;
  }, 0);

  const averAge = sumAge / arrWomen.length;

  return averAge;
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
  // write code here

  const arrWomen = people
    .filter(person => person.sex === 'f')
    .filter(woman => people.some(child =>
      child.mother === woman.name));

  const arrChildren = people.filter(person =>
    arrWomen.find(woman => woman.name === person.mother))
    .filter(child => child.sex === 'm' || !onlyWithSon);

  const arrDiff = arrChildren.map(child => {
    const motherOfChild = arrWomen.find(mother => child.mother === mother.name);

    return child.born - motherOfChild.born;
  });

  const sumAge = arrDiff.reduce((prev, currentValue) => {
    return prev + currentValue;
  }, 0);

  const averAge = sumAge / arrDiff.length;

  return averAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
