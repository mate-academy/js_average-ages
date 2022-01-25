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

  const menAge = men.map(countAge).reduce(reducing, 0) / men.length;

  return rounding(menAge);
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
  let womenAge;

  if (withChildren) {
    womenAge = people.filter(person =>
      people.find(child => child.mother === person.name))
      .map(countAge);
  } else {
    womenAge = people.filter(person => person.sex === 'f').map(countAge);
  }

  const allAge = womenAge.reduce(reducing, 0) / womenAge.length;

  return rounding(allAge);
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
  let children = people.filter(child =>
    people.find(mother => mother.name === child.mother));

  if (onlyWithSon) {
    children = children.filter(person => person.sex === 'm');
  }

  const mothers = people.filter(person =>
    people.find(child => child.mother === person.name));

  const averageDiffAge = children
    .map(child => child.born - mothers
      .find(mom => child.mother === mom.name).born)
    .reduce(reducing, 0) / children.length;

  return rounding(averageDiffAge);
}

function reducing(sumAge, age) {
  return sumAge + age;
}

function rounding(number) {
  return Math.round(number * 100) / 100;
}

function countAge(person) {
  return person.died - person.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
