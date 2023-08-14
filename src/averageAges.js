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
const CENTURY = 100;
const MALE = 'm';
const FEMALE = 'f';

function calculateAverageAges(people) {
  return people.reduce((total, { born, died }) =>
    total + (died - born
    ), 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const filteredPeopleByMan = people.filter(({ sex, died }) => {
    return century
      ? sex === MALE && Math.ceil(died / CENTURY) === century
      : sex === MALE;
  });

  return calculateAverageAges(filteredPeopleByMan);
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
  const filteredPeopleByWoman = people.filter(({ sex, name }) => {
    return withChildren
      ? sex === FEMALE && people.some(({ mother }) => name === mother)
      : sex === FEMALE;
  });

  return calculateAverageAges(filteredPeopleByWoman);
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
  const filteredPeopleByMother = people.filter(
    ({ sex, mother: motherName }) => {
      const mother = people.find(({ name }) => motherName === name);

      return onlyWithSon ? mother && sex === MALE : mother;
    });

  const averageAgeDiff = filteredPeopleByMother.reduce(
    (total, { born, mother }) => {
      const motherBorn = people.find(({ name }) => name === mother).born;

      return total + (born - motherBorn);
    }, 0) / filteredPeopleByMother.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
