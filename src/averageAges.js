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
const MALE_SEX = 'm';
const FEMALE_SEX = 'f';
const CUNTURY_COEFFICIENT = 100;

const calculateAverageAge = (arrayOfPeople) =>
  arrayOfPeople.reduce((year, person) =>
    year + person.died - person.born, 0) / arrayOfPeople.length || 0;

function calculateMenAverageAge(people, century) {
  const mensOfCenturyArray = people.filter(person => (
    person.sex === MALE_SEX && (century
      ? Math.ceil(person.died / CUNTURY_COEFFICIENT) === century
      : true)
  ));

  return calculateAverageAge(mensOfCenturyArray);
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
  const womensOfCenturyArray = people.filter(person =>
    (person.sex === FEMALE_SEX && (withChildren
      ? people.some(child => child.mother === person.name)
      : true)
    ));

  return calculateAverageAge(womensOfCenturyArray);
}

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
  const peopleWithMothers = people
    .filter(person => (onlyWithSon
      ? person.sex === MALE_SEX
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
