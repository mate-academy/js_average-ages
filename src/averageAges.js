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
  const database = people.filter(person => {
    if (century !== undefined && person.sex === 'm') {
      return Math.ceil(person.died / 100) === century;
    }

    return person.sex === 'm';
  });

  const totalAge = database.reduce(
    (accumulator, person) => accumulator + (person.died - person.born), 0);
  const averageAge = totalAge / database.length;

  return averageAge;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const database = people.filter(person => {
    if (withChildren && person.sex === 'f') {
      const childNames = people.filter(p => p.mother === person.name)
        .map(p => p.name);

      return childNames.length > 0;
    }

    return person.sex === 'f';
  });

  const totalAge = database.reduce(
    (accumulator, person) => accumulator + (person.died - person.born), 0);
  const averageAge = totalAge / database.length;

  return averageAge;
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

function filterPeopleWithMother(people) {
  return people.filter(person => person.mother);
}

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let filteredPeople = filterPeopleWithMother(people);

  if (onlyWithSon) {
    filteredPeople = filteredPeople.filter(person => person.sex === 'm');
  }

  const motherChildBirthYears = filteredPeople.map(person => {
    const mother = people.find(p => p.name === person.mother);

    return mother ? {
      motherBorn: mother.born, childBorn: person.born,
    } : null;
  }).filter(val => val !== null);

  const ageDifferences = motherChildBirthYears.map((
    { motherBorn, childBorn }) => childBorn - motherBorn);

  const averageAgeDiff
    = ageDifferences.reduce((total, ageDiff) => total + ageDiff, 0)
    / ageDifferences.length;

  return averageAgeDiff;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
