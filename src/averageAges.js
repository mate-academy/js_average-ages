'use strict';

const MALE_SEX = 'm';
const FEMALE_SEX = 'f';
const CENTURY_DIVIDER = 100;
/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
/* eslint-disable no-console */

function calculateMenAverageAge(people, century) {
  const mens = people.filter(person => {
    return isMale(person)
      && (century
        ? (Math.ceil(person.died / CENTURY_DIVIDER) === century)
        : true);
  });

  return +getAverageAge(mens).toFixed(2);
};

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(women => {
    return isFemale(women)
      && (withChildren
        ? people.some(child => child.mother === women.name)
        : true);
  });

  return +getAverageAge(womens).toFixed(2);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrens = people.filter(child => {
    return people.some(mother => mother.name === child.mother)
      && (onlyWithSon
        ? isMale(child)
        : true);
  });

  return childrens.reduce((sum, child) => {
    const mother = people.find(
      possibleMother => {
        return child.mother === possibleMother.name;
      });

    return sum + (child.born - mother.born);
  }, 0) / childrens.length;
}

function getAverageAge(arrayOfPersons) {
  return arrayOfPersons.reduce((sum, person) => {
    return sum + getAge(person);
  }, 0) / arrayOfPersons.length;
}

function checkIfCorrespondingSex(sex) {
  return (person) => person.sex === sex;
};

function getAge(person) {
  return person.died - person.born;
};

const isMale = checkIfCorrespondingSex(MALE_SEX);
const isFemale = checkIfCorrespondingSex(FEMALE_SEX);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
