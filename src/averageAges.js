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
  const men = people.filter(
    person =>
      isMale(person)
        && (century
          ? (Math.ceil(person.died / CENTURY_DIVIDER) === century)
          : true)
  );

  return getAverageAge(men);
};

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(
    person =>
      isFemale(person)
        && (withChildren
          ? people.some(child => child.mother === person.name)
          : true)
  );

  return getAverageAge(women);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrens = people.filter(
    person =>
      people.some(mother => mother.name === person.mother)
        && (onlyWithSon
          ? isMale(person)
          : true)
  );

  return childrens.reduce((sum, child) => {
    const mother = people.find(
      person =>
        child.mother === person.name
    );

    return sum + (child.born - mother.born);
  }, 0) / childrens.length;
}

function getAverageAge(people) {
  return +(people.reduce(
    (sum, person) =>
      sum + getAge(person)
    , 0) / people.length).toFixed(2);
}

function checkSex(sex) {
  return (person) => person.sex === sex;
};

function getAge(person) {
  return person.died - person.born;
};

const isMale = checkSex(MALE_SEX);
const isFemale = checkSex(FEMALE_SEX);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
