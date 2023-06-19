'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const targetMen = people
    .filter(({ sex, died }) => sex === 'm'
      && (century
        ? Math.ceil(died / 100) === century
        : true
      ));

  return calculateAverageAge(targetMen);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const targetWomen = people
    .filter(({ name, sex }) => sex === 'f'
      && (withChildren
        ? checkIsMother(name, people)
        : true
      ));

  return calculateAverageAge(targetWomen);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const targetChildren = people.filter(({ mother, sex }) => (
    findMother(mother, people)
      && (onlyWithSon
        ? sex === 'm'
        : true)
  ));

  return targetChildren.reduce((ageDiff, { mother, born }) => {
    const motherBirthYear = findMother(mother, people).born;

    return ageDiff + born - motherBirthYear;
  }, 0) / targetChildren.length;
}

function calculateAverageAge(targetPeople) {
  return targetPeople.reduce((yearsTotal, { born, died }) => (
    yearsTotal + died - born
  ), 0) / targetPeople.length;
}

function checkIsMother(name, people) {
  return people.some(({ mother }) => mother === name);
}

function findMother(motherName, people) {
  return people.find(({ name }) => name === motherName);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
