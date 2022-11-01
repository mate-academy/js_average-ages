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

function filterGender(people, sex) {
  if (sex === 'male') {
    return people.filter(person => person.sex === 'm');
  }

  if (sex === 'female') {
    return people.filter(person => person.sex === 'f');
  }
}

function findAverage(people) {
  const sumOfAge = people.reduce((x, year) => (
    x + (year.died - year.born)
  ), 0);

  const averageAge = sumOfAge / people.length;

  return Math.round(averageAge * 100) / 100;
}

function calculateMenAverageAge(people, century) {
  const men = filterGender(people, 'male');

  const menInCentury = century
    ? men.filter(person => (Math.ceil(person.died / 100) === century))
    : men;

  return findAverage(menInCentury);
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
  const women = filterGender(people, 'female');

  const womenWithChildren = withChildren
    ? women.filter(mother => (people.map(children => children.mother)
      .includes(mother.name)))
    : women;

  return findAverage(womenWithChildren);
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
  // write code here
  const maleChild = filterGender(people, 'male');

  const womenWithChildren = onlyWithSon
    ? maleChild.filter(child => (
      people.find(person => child.mother === person.name)))
    : people.filter(child => (
      people.find(person => child.mother === person.name)));

  const sumAge = womenWithChildren.map(child => (
    child.born - people.find(person => (
      child.mother === person.name)).born
  ));

  const difference = sumAge.reduce((sum, n) => (
    sum + n
  ), 0) / sumAge.length;

  return difference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
