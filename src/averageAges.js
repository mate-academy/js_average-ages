'use strict';

const SEX_MALE = 'm';
const SEX_FEMALE = 'f';
const CENTURY_VALUE = 100;
const OPTION_NOT_ACTIVE = true;

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const malePeople = people.filter(
    (person) =>
      isMale(person)
      && (century ? isDiedInCentury(person, century) : OPTION_NOT_ACTIVE)
  );

  return calculateAverageAge(malePeople);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const femalePeople = people.filter(
    (person) =>
      isFemale(person)
      && (withChildren ? hasChildren(person, people) : OPTION_NOT_ACTIVE)
  );

  return calculateAverageAge(femalePeople);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleWithMothers = people.filter(
    (person) =>
      (onlyWithSon ? isMale(person) : OPTION_NOT_ACTIVE)
      && hasMother(person, people)
  );

  const totalAgeDiff = peopleWithMothers.reduce(
    (acc, person) =>
      acc + getChildAndMotherAgeDiff(person, getMother(person, people)),
    0
  );

  return totalAgeDiff / peopleWithMothers.length;
}

/**
 * @param {object[]} people
 *
 * @return {number}
 */
function calculateAverageAge(people) {
  const totalAge = people.reduce(
    (acc, person) => acc + getAge(person),
    0
  );

  return totalAge / people.length;
}

/**
 * @param {object} person
 *
 * @return {number}
 */
function getAge(person) {
  return person.died - person.born;
}

/**
 * @param {number} year
 *
 * @return {number}
 */
function getCentury(year) {
  return Math.ceil(year / CENTURY_VALUE);
}

/**
 * @param {object} person
 * @param {number} century
 *
 * @return {boolean}
 */
function isDiedInCentury(person, century) {
  return getCentury(person.died) === century;
}

/**
 * @param {object} person
 *
 * @return {boolean}
 */
function isMale(person) {
  return person.sex === SEX_MALE;
}

/**
 * @param {object} person
 *
 * @return {boolean}
 */
function isFemale(person) {
  return person.sex === SEX_FEMALE;
}

/**
 * @param {object} parent
 * @param {object} child
 *
 * @return {boolean}
 */
function isMother(parent, child) {
  return parent.name === child.mother;
}

/**
 * @param {object} mother
 * @param {object[]} children
 *
 * @return {boolean}
 */
function hasChildren(mother, children) {
  return children.some((child) => isMother(mother, child));
}

/**
 * @param {object} child
 * @param {object[]} parents
 *
 * @return {boolean}
 */
function hasMother(child, parents) {
  return parents.some((parent) => isMother(parent, child));
}

/**
 * @param {object} child
 * @param {object[]} parents
 *
 * @return {object}
 */
function getMother(child, parents) {
  return parents.find((parent) => isMother(parent, child));
}

/**
 * @param {object} child
 * @param {object} mother
 *
 * @return {number}
 */
function getChildAndMotherAgeDiff(child, mother) {
  return child.born - mother.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
