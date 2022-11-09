'use strict';

/*
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const allMen = century
    ? personGender(people, 'm')
      .filter(person => Math.ceil(person.died / 100) === century)
    : personGender(people, 'm');

  return calculateAverageAge(allMen);
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
  const allWoman = withChildren
    ? personGender(people, 'f')
      .filter((person) => people
        .some(kid => kid.mother === person.name))
    : personGender(people, 'f');

  return calculateAverageAge(allWoman);
};

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
  const motherWithChildren = onlyWithSon
    ? personGender(people, 'm')
      .filter((child) => people
        .find((person) => child.mother === person.name))
    : people
      .filter((child) => people
        .find((person) => child.mother === person.name));

  const result = motherWithChildren
    .map(child => (child.born - people
      .find(person => (child.mother === person.name)).born));

  const difference = result
    .reduce((sum, year) => sum + year, 0) / result.length;

  return difference;
}

const personGender = (people, gender) => {
  return people.filter(person => person.sex === gender);
};

const calculateAverageAge = (people) => {
  return people.reduce((sum, person) =>
    (sum + (person.died - person.born)), 0) / people.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
