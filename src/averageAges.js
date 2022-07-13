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
function isMale(sex) {
  return sex === 'm';
}

function isFemale(sex) {
  return sex === 'f';
}

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => (
    century
      ? isMale(person.sex) && Math.ceil(person.died / 100) === century
      : isMale(person.sex)
  ));

  const menAverageAge = men.reduce((sum, person) => (
    sum + person.died - person.born
  ), 0) / men.length;

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
  const hasChildren = (personName) => people.some((person) => (
    person.mother === personName
  ));

  const women = people.filter((person) => (
    withChildren
      ? isFemale(person.sex) && hasChildren(person.name)
      : isFemale(person.sex)
  ));

  const womenAverageAge = women.reduce((sum, person) => (
    sum + person.died - person.born
  ), 0) / women.length;

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
  const hasMother = (mother) => people.some(person => (
    mother === person.name
  ));

  const getMotherBornDate = (motherName) => people.find(person => (
    motherName === person.name
  ))['born'];

  const children = people.filter((person) => (
    onlyWithSon
      ? isMale(person.sex) && hasMother(person.mother)
      : hasMother(person.mother)
  ));

  const averageAgeDiff = children.reduce((sum, person) => (
    sum + person.born - getMotherBornDate(person.mother)
  ), 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
