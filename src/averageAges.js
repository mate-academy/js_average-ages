'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
const MALE_SEX = 'm';
const FEMALE_SEX = 'f';

function findMother(people, person) {
  return people.find(p => p.name === person.mother);
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === MALE_SEX
    && (century
      ? Math.ceil(person.died / 100) === century
      : true));

  const mensAge = men.map(man => man.died - man.born);

  const averageMansAge = mensAge.reduce((acc, age) => {
    return acc + age;
  }, 0) / mensAge.length;

  return averageMansAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const femaleAge = people.filter(person => person.sex === FEMALE_SEX
    && (withChildren
      ? people.some((child) => child.mother === person.name)
      : person.sex === FEMALE_SEX));

  const femaleAverageAge = femaleAge.reduce((ageAccum, person) =>
    ageAccum + (person.died - person.born), 0) / femaleAge.length;

  return femaleAverageAge;
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  let filteredChildren = people.filter(person => findMother(people, person));

  if (onlyWithSon) {
    filteredChildren = filteredChildren.filter(child => child.sex === MALE_SEX);
  }

  filteredChildren = filteredChildren
    .map((child) => child.born - findMother(people, child).born);

  return filteredChildren.reduce((childEverageAge, motherEverageAge) =>
    childEverageAge + motherEverageAge) / filteredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
