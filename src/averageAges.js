'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

const MALE = 'm';
const FEMALE = 'f';

function calculateAgeSum(people) {
  return people.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);
}

function calculateMenAverageAge(people, century) {
  const filteredPeopleByMan = people.filter((person) => {
    if (century) {
      const personDeathCentury = Math.ceil(person.died / 100);

      return century === personDeathCentury && person.sex === MALE;
    }

    return person.sex === MALE;
  });

  const ageSum = calculateAgeSum(filteredPeopleByMan);

  return ageSum / filteredPeopleByMan.length;
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
  const filteredPeopleByChildren = people.filter((person) => {
    if (withChildren) {
      return mothers.includes(person.name) && person.sex === FEMALE;
    }

    return person.sex === FEMALE;
  });

  const ageSum = calculateAgeSum(filteredPeopleByChildren);

  return ageSum / filteredPeopleByChildren.length;
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
    });

  const filteredPeopleByMother = peopleWithMothers.filter((person) => {
    if (onlyWithSon) {
      return person.sex === MALE && person.mother;
    }

    return person.mother;
  });

  const ageDiffSum = filteredPeopleByMother
    .reduce((acc, person) => {
      const diff = person.born - person.mother.born;

      return acc + diff;
    }, 0);

  return ageDiffSum / filteredPeopleByMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
