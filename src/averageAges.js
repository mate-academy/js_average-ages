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
const PERSON_SEX_MALE = 'm';
const PERSON_SEX_FEMALE = 'f';
const CENTURY_SEPARATOR = 100;

function calculateAverageAge(filteredPeople) {
  return filteredPeople.reduce((sum, { died, born }) => (
    sum + (died - born)
  ), 0) / filteredPeople.length;
}

function calculateMenAverageAge(people, century) {
  const filteredPeople = century
    ? people.filter(({ died }) => (
      Math.ceil(died / CENTURY_SEPARATOR) === century))
    : people;
  const malePeople = filteredPeople.filter(({ sex }) =>
    (sex === PERSON_SEX_MALE));

  return calculateAverageAge(malePeople);
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
  const filteredWomen = people.filter(({ sex, name }) => (
    sex === PERSON_SEX_FEMALE
    && (!withChildren || people.some((child) => child.mother === name))
  ));

  return calculateAverageAge(filteredWomen);
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
  const filtredChildren = people
    .filter(child => (onlyWithSon
      ? child.sex === PERSON_SEX_MALE : true)
      && people.some(person => child.mother === person.name)
    );

  return filtredChildren.reduce((sum, child) => {
    const mother = people.find(peson => peson.name === child.mother);
    const ageDifference = child.born - mother.born;

    return sum + ageDifference;
  }, 0) / filtredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
