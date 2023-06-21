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
  function getAverageAge() {
    return century
      ? people
        .filter(person => person.sex === 'm'
          && Math.ceil(person.died / 100) === century)

      : people.filter(person => person.sex === 'm');
  }

  return getAverageAge().reduce(
    (acc, person) => acc + (person.died - person.born), 0
  ) / getAverageAge().length;
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
  function getAverageAge() {
    const mothersNames = [...new Set(people
      .map(person => person.mother)
      .filter((mother) => mother !== null))];

    return withChildren
      ? people.filter(person => person.sex === 'f'
        && mothersNames.includes(person.name))

      : people.filter(person => person.sex === 'f');
  }

  return getAverageAge().reduce(
    (acc, mother) => acc + (mother.died - mother.born), 0
  ) / getAverageAge().length;
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
  function findMother(person) {
    return people.find(p => p.name === person.mother);
  }

  const peopleWithMother = onlyWithSon
    ? people.filter(person => person.sex === 'm' && person.mother !== null)
    : people.filter(person => person.mother !== null);

  const ageDifferences = peopleWithMother.map(person => {
    const mother = findMother(person);

    return mother ? person.born - mother.born : 0;
  }).filter(dif => dif !== 0);

  const averageAgeDiff = ageDifferences
    .reduce((acc, dif) => acc + dif, 0) / ageDifferences.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
