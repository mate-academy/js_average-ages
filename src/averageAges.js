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
  const sexFiltered = people.filter(peopleInfo => peopleInfo.sex === 'm');
  const sexAndCenturyFiltered = sexFiltered.filter(
    peopleInfo => Math.ceil(peopleInfo.died / 100) === century
  );

  const filtered = century
    ? sexAndCenturyFiltered
    : sexFiltered;

  return (filtered.reduce((sum, peopleInfo) => (
    sum + (peopleInfo.died - peopleInfo.born)
  ), 0)) / filtered.length;
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
  const sexFiltered = people.filter(peopleInfo => peopleInfo.sex === 'f');
  const sexAndChildFiltered = sexFiltered.filter(
    peopleInfo => people.some(person => person.mother === peopleInfo.name
  ));

  const filtered = withChildren
    ? sexAndChildFiltered
    : sexFiltered;

  return (filtered.reduce((sum, peopleInfo) => (
    sum + (peopleInfo.died - peopleInfo.born)
  ), 0)) / filtered.length;
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
  const childFiltered = people.filter(
    peopleInfo => people.some(
    person => person.name === peopleInfo.mother
  ));

  const childAndSonsFiltered = childFiltered.filter(peopleInfo =>
    peopleInfo.sex === 'm'
  );

  const filtered = onlyWithSon
    ? childAndSonsFiltered
    : childFiltered;

  const findMother = (peopleInfo) =>
    people.find(person => person.name === peopleInfo.mother
  );

  return filtered.reduce((sum, peopleInfo) => (
    sum + peopleInfo.born - findMother(peopleInfo).born
  ), 0) / filtered.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
