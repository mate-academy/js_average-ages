'use strict';

const MALE_SIGN = 'm';
const FEMALE_SIGN = 'f';
const CENTURY_SIZE = 100;

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

function averageOfArray(array) {
  const arraySum = array.reduce((accumulator, el) => accumulator + el, 0);

  return arraySum / array.length;
}

function calculateMenAverageAge(people, century) {
  let males = people.filter(({ sex }) => sex === MALE_SIGN);

  if (century) {
    males = males.filter(({ died }) => {
      return Math.ceil(died / CENTURY_SIZE) === century;
    });
  }

  const ages = males.map(({ born, died }) => died - born);

  return averageOfArray(ages);
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
  let females = people.filter(({ sex }) => sex === FEMALE_SIGN);

  if (withChildren) {
    females = females.filter(({ name }) => {
      return people.some(({ mother }) => mother === name);
    });
  }

  const ages = females.map(({ born, died }) => died - born);

  return averageOfArray(ages);
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
  let children = people.filter(({ mother }) => {
    return people.some(({ name }) => name === mother);
  });

  if (onlyWithSon) {
    children = children.filter(({ sex }) => sex === MALE_SIGN);
  }

  const ageDiff = children.map(({ born, mother }) => {
    const motherBorn = people.find(({ name }) => {
      return mother === name;
    }).born;

    return born - motherBorn;
  });

  return averageOfArray(ageDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
