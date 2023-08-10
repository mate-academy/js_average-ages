'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

const MALE = 'm';
const FEMALE = 'f';

function calculateMenAverageAge(people, century) {
  const filteredArr = century
    ? people.filter((person) => {
      const personDeathCentury = Math.ceil(person.died / 100);

      return century === personDeathCentury && person.sex === MALE;
    })
    : people.filter((person) => person.sex === MALE);

  const ageSum = filteredArr.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  return ageSum / filteredArr.length;
}

/**
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map(person => person.mother);
  const filteredArr = withChildren
    ? people.filter((person) => {
      return mothers.includes(person.name) && person.sex === FEMALE;
    })
    : people.filter((person) => person.sex === FEMALE);

  const ageSum = filteredArr.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  return ageSum / filteredArr.length;
}

/**
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleWithMothers = people
    .map((person) => {
      const mother = people.find((human) => human.name === person.mother);

      return {
        ...person,
        mother,
      };
    })
    .filter((person) => person.mother);

  const filteredArr = onlyWithSon
    ? peopleWithMothers.filter((person) => person.sex === MALE)
    : peopleWithMothers;

  const ageSum = filteredArr
    .reduce((acc, person) => {
      const diff = person.born - person.mother.born;

      return acc + diff;
    }, 0);

  return ageSum / filteredArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
