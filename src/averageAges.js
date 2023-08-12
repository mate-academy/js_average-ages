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
const FEMALE = 'f';
const MALE = 'm';
const CENTURY_COEF = 100;

const calculateAverageAge = (arrayOfPeople) =>
  arrayOfPeople.reduce((year, person) =>
    year + person.died - person.born, 0) / arrayOfPeople.length || 0;

function calculateMenAverageAge(people, century) {
  const mensOfCenturyArray = people.filter(person => (
    person.sex === MALE && (century
      ? Math.ceil(person.died / CENTURY_COEF) === century
      : true)
  ));

  return calculateAverageAge(mensOfCenturyArray);
}

/**
unction calculateMenAverageAge(people, century) {
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenOfCenturyArray = people.filter(person =>
    (person.sex === FEMALE && (withChildren
      ? people.some(child => child.mother === person.name)
      : true)
    ));

  return calculateAverageAge(womenOfCenturyArray);
}

/**
function calculateWomenAverageAge(people, withChildren) {
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleWithMothers = people
    .filter(person => (onlyWithSon
      ? person.sex === MALE
      : true) && (people.some(child => child.name === person.mother)
    ));

  const arrayOfChildMotherYears = peopleWithMothers.map(person =>
    ({
      died: person.born,
      born: people.find(mother => person.mother === mother.name).born,
    })
  );

  return calculateAverageAge(arrayOfChildMotherYears);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
