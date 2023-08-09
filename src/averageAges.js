'use strict';

const MALE_SEX = 'm';
const FEMALE_SEX = 'f';
const CENTURY_DIVIDER = 100;

function findPersonByCriteria(arrayOfPersons, arg, criteria) {
  return arrayOfPersons.find(person => person[arg] === criteria);
}

function roundAfterDotTwoDigit(value) {
  return Math.round(value * 100) / 100;
}

function getAverage(arrayOfPersons) {
  return arrayOfPersons.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0) / arrayOfPersons.length;
}

function findOutSex(sex) {
  return (personSex) => personSex === sex;
};

const checkIfMale = findOutSex(MALE_SEX);
const checkIfFemale = findOutSex(FEMALE_SEX);
/**
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
/* eslint-disable no-console */

function calculateMenAverageAge(people, century) {
  const mens = people.filter(person => {
    return checkIfMale(person.sex) && (century
      ? (Math.ceil(person.died / CENTURY_DIVIDER) === century)
      : true);
  });

  return roundAfterDotTwoDigit(getAverage(mens));
};

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(person => {
    return checkIfFemale(person.sex) && (withChildren
      ? findPersonByCriteria(people, 'mother', person.name)
      : true);
  });

  return roundAfterDotTwoDigit(getAverage(womens));
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrens = people.filter(person => {
    return findPersonByCriteria(people, 'name', person.mother)
      && (onlyWithSon ? checkIfMale(person.sex) : true);
  });

  return childrens.reduce((sum, child) => {
    const mother = findPersonByCriteria(people, 'name', child.mother);

    return sum + (child.born - mother.born);
  }, 0) / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
