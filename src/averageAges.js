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
  const menList = people
    .filter(person => person.sex === 'm'
      && (!century || century === Math.ceil(person.died / 100)));

  const totalSumOfAges = menList.reduce((sumOfAges, person) => {
    const personAge = person.died - person.born;

    return sumOfAges + personAge;
  }, 0);

  const amountOfMen = menList.length;
  const averageAge = totalSumOfAges / amountOfMen;

  return averageAge;
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

function calculateWomenAverageAge(people, hasChild) {
  const womenList = people
    .filter(person => person.sex === 'f'
    && (!hasChild || people.some(possChild => possChild.mother === person.name
    )));

  const totalSumOfAges = womenList.reduce((sumOfAges, person) => {
    const personAge = person.died - person.born;

    return sumOfAges + personAge;
  }, 0);

  const amountOfWomen = womenList.length;
  const averageAge = totalSumOfAges / amountOfWomen;

  return averageAge;
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
  const childrenList = people
    .filter(child => people.some(possMother => possMother.name === child.mother
      && (!onlyWithSon || child.sex === 'm')));

  const totalSumOfAgesDiffs = childrenList.reduce((sumOfAgeDiffs, child) => {
    const mother = people.find(person => child.mother === person.name);
    const ageDifference = child.born - mother.born;

    return sumOfAgeDiffs + ageDifference;
  }, 0);

  const amountOfChildren = childrenList.length;
  const averageAgeDiff = totalSumOfAgesDiffs / amountOfChildren;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
