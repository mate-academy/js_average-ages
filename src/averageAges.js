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
  const filteredPeople = people
    .filter(({ sex, died }) =>
      sex === 'm'
      && (!century || Math.ceil(died / 100) === century)
    );

  return calculateAverage(filteredPeople, 'died', 'born');
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
  const filteredPeople = people
    .filter(({ sex, name }) =>
      sex === 'f'
      && (!withChildren || people.some(({ mother }) => mother === name))
    );

  return calculateAverage(filteredPeople, 'died', 'born');
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
  const filteredPeople = people
    .filter(({ sex, mother }) =>
      people.some(({ name }) => name === mother)
      && (!onlyWithSon || sex === 'm')
    );
  const peopleWithMotherBornYear = filteredPeople
    .map(person => {
      person.motherBorn = people
        .find(({ name }) => name === person.mother)
        .born;

      return person;
    });

  return calculateAverage(peopleWithMotherBornYear, 'born', 'motherBorn');
}

/**
 * The function returns average diff for array of people.
 * Takes keys from person's object to work with.
 *
 * @param {object[]} people
 * @param {string} keyA
 * @param {string} keyB
 *
 * @return {number}
 */
function calculateAverage(people, keyA, keyB) {
  const sumYears = people
    .reduce((sum, { [keyA]: yearA, [keyB]: yearB }) =>
      sum + (yearA - yearB), 0);

  return people.length && sumYears / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
