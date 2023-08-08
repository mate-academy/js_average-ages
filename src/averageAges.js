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
  return people
    .filter(({ sex, died }) => {
      const deathCentury = Math.ceil(died / 100);
      const boolean = century
        ? sex === 'm' && deathCentury === century
        : sex === 'm';

      return boolean;
    })
    .reduce((acc, person, index, array) => {
      const { born, died } = person;
      const age = died - born;

      if (index === array.length - 1) {
        return (acc + age) / array.length;
      }

      return acc + age;
    }, 0);
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
  const womenArray = people.filter(({ sex }) => sex === 'f');

  const filteredWomenByChildren = withChildren
    ? womenArray.filter(({ name }) =>
      people.some(({ mother }) => mother === name))
    : womenArray;

  return filteredWomenByChildren.reduce((acc, person, index, array) => {
    const { born, died } = person;
    const age = died - born;

    if (index === array.length - 1) {
      return (acc + age) / array.length;
    }

    return acc + age;
  }, 0);
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
    mother !== null && people.find(person => person.name === mother));

  const filteredPeopleWithMotherBySex = onlyWithSon
    ? peopleWithMother.filter(({ sex }) => sex === 'm')
    : peopleWithMother;

  return filteredPeopleWithMotherBySex
    .reduce((acc, child, index, array) => {
      const { born, mother: motherName } = child;
      const mother = people.find(person => person.name === motherName);

      const ageDiff = mother
        ? born - mother.born
        : 0;

      if (index === array.length - 1) {
        return (acc + ageDiff) / array.length;
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
