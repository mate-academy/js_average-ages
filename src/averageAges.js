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
const MALE = 'm';
const FEMALE = 'f';
const AGE_DIVIDER = 100;

function getAverageAges(persons) {
  return persons.reduce((sumAge, person) =>
    sumAge + (person.died - person.born), 0) / persons.length;
}

function calculateMenAverageAge(people, century) {
  const menOnly = people.filter((person) => (
    !century
      ? (person.sex === MALE)
      : (century
        === Math.ceil(person.died / AGE_DIVIDER) && person.sex === MALE)
  ));

  const averageManAges = getAverageAges(menOnly);

  return +(averageManAges).toFixed(2);
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
 *
 * @return {number}
 * @param getTotalPeopleAge
 */

function calculateWomenAverageAge(people, withChildren) {
  const womenOnly = people.filter(({ sex, name }) => {
    return !withChildren
      ? sex === FEMALE
      : sex === FEMALE && people.some(person => person.mother === name);
  });

  const averageWomenAges = getAverageAges(womenOnly);

  return +(averageWomenAges).toFixed(2);
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
  const peopleWithMothers = people.filter((person) => {
    return ((!onlyWithSon || person.sex === MALE)
      && people.some((mom) => mom.name === person.mother)
    );
  });

  const ageDiff = peopleWithMothers
    .reduce((acc, { born, mother: motherName }) => {

      const motherBirthYear = people
        .find(({ name }) => name === motherName);

      return acc + born - motherBirthYear.born;
    }, 0);

  return ageDiff / peopleWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
