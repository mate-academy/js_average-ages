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

function findAverageAge(people) {
  const sumAges = people
    .map(person => person.died - person.born)
    .reduce((sum, currAge) => sum + currAge) / people.length;

  return sumAges;
}

function calculateMenAverageAge(people, century) {
  const filterMen = people.filter(elem => elem.sex === 'm');

  const avrMenAges = century
    ? filterMen.filter(
      person => Math.ceil(person.died / 100) === century
    )
    : filterMen;

  return findAverageAge(avrMenAges);
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
  const filterWomen = people.filter(elem => elem.sex === 'f');

  const avrWomenAges = withChildren
    ? people.filter(person => people.find(
      child => person.name === child.mother
    ))
    : filterWomen;

  return findAverageAge(avrWomenAges);
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
  const avrChildAges = people.filter(person => (
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
        && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  ))
    .map(
      child => child.born - people
        .find(mother => mother.name === child.mother).born
    );

  return avrChildAges.reduce((prev, current) =>
    prev + current) / avrChildAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
