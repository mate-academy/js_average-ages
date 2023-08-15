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

function sumAges(persons) {
  return persons.reduce((sumAge, person) =>
    sumAge + (person.died - person.born), 0);
}

function calculateMenAverageAge(people, century) {
  const manOnly = people.filter((person) => (
    !century
      ? (person.sex === MALE)
      : (century
        === Math.ceil(person.died / AGE_DIVIDER) && person.sex === MALE)
  ));

  const sumManAge = sumAges(manOnly);

  return +(sumManAge / manOnly.length).toFixed(2);
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

  const sumWomenAge = sumAges(womenOnly);

  return +(sumWomenAge / womenOnly.length).toFixed(2);
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

  return peopleWithMothers.reduce((acc, person) => {
    const mother = people.find((mom) => mom.name === person.mother);
    const ageDifference = person.born - mother.born;

    return acc + ageDifference;
  }, 0) / peopleWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
