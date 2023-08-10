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
const SEX_MALE = 'm';
const SEX_FEMALE = 'f';
const CENTURY_VALUE = 100;

const getAverageAge = (peopleArray) =>
  peopleArray.reduce((acc, person, personIndex) => {
    const { born, died } = person;
    const age = died - born;

    if (personIndex === peopleArray.length - 1) {
      return (acc + age) / peopleArray.length;
    }

    return acc + age;
  }, 0);

function calculateMenAverageAge(people, century) {
  const filteredPeopleBySex = people
    .filter(({ sex, died }) => {
      const deathCentury = Math.ceil(died / CENTURY_VALUE);
      const isCenturyRequired = century
        ? sex === SEX_MALE && deathCentury === century
        : sex === SEX_MALE;

      return isCenturyRequired;
    });

  return getAverageAge(filteredPeopleBySex);
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
  const womenArray = people.filter(({ sex }) => sex === SEX_FEMALE);

  const filteredWomenByChildren = withChildren
    ? womenArray.filter(({ name }) =>
      people.some(({ mother }) => mother === name))
    : womenArray;

  return getAverageAge(filteredWomenByChildren);
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
  const peopleWithMother = people.filter(({ mother }) =>
    mother !== null && people.find(({ name }) => name === mother));

  const filteredPeopleWithMotherBySex = onlyWithSon
    ? peopleWithMother.filter(({ sex }) => sex === SEX_MALE)
    : peopleWithMother;

  return filteredPeopleWithMotherBySex
    .reduce((acc, child, index) => {
      const { born, mother: motherName } = child;
      const mother = people.find(person => person.name === motherName);

      const ageDiff = mother
        ? born - mother.born
        : 0;

      if (index === filteredPeopleWithMotherBySex.length - 1) {
        return (acc + ageDiff) / filteredPeopleWithMotherBySex.length;
      }

      return acc + ageDiff;
    }, 0);
}

// 1. find a mother of each person (or only for men)
// 2. keep people who have mothers in the array
// 3. calculate the difference child.born - mother.born
// 4. return the average value

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
