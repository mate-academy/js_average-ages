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
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(person => Math.ceil(person.died / 100) === century);
  }

  const menAge = men.map(person => person.died - person.born)
    .reduce(reducing, 0) / men.length;

  return Math.round(menAge * 100) / 100;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  let women = people;

  if (withChildren) {
    womenAges = people.filter(person =>
      people.find(child => child.mother === person.name))
      .map(person => person.died - person.born);
  } else {
    women = people.filter(person => person.sex === 'f')
      .map(person => person.died - person.born);
  }

  const allAge = women.reduce(reducing, 0) / women.length;

  return Math.round(allAge * 100) / 100;
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
  let mothers = people.filter(person =>
    people.find(child => child.mother === person.name));

  let children = people.filter(child =>
    people.find(mother => mother.name === child.mother));

  if (onlyWithSon) {
    children = children.filter(person => person.sex === 'm');

    mothers = mothers.filter(person =>
      children.find(son => son.mother === person.name));
  }

  const averageDiffAge = children.map(child => child.born
    - mothers.find(mom => child.mother === mom.name).born)
    .reduce(reducing, 0) / children.length;

  return rounding(averageDiffAge);
}

function reducing(sumAge, age) {
  return sumAge + age;
}

function rounding(number) {
  return Math.round(number * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
