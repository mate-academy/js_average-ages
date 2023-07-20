'use strict';

function isMale(person) {
  const MALE_SEX = 'm';

  return person.sex === MALE_SEX;
}

function isFemale(person) {
  const FEMALE_SEX = 'f';

  return person.sex === FEMALE_SEX;
}

function calculateAverage(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function calculateAverageAge(people) {
  return calculateAverage(
    people.map((person) => person.died - person.born)
  );
}

function getCentury(person) {
  const CENTURY = 100;

  return Math.ceil(person.died / CENTURY);
}

function getChild(person, people) {
  return people.find((child) => person.name === child.mother);
}

function getMother(person, people) {
  return people.find((mother) => mother.name === person.mother);
}

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
function calculateMenAverageAge(people, century) {
  const men = people
    .filter((person) => !century || getCentury(person) === century)
    .filter(isMale);

  return calculateAverageAge(men);
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
  const women = people
    .filter(isFemale)
    .filter((person) => !withChildren || getChild(person, people));

  return calculateAverageAge(women);
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
  const mothers = people
    .filter(isFemale)
    .filter((person) => getChild(person, people));

  const children = people
    .filter((person) => person.mother !== null && getMother(person, mothers))
    .filter((person) => !onlyWithSon || isMale(person));

  const ageDifferences = children
    .map((person) => person.born - getMother(person, mothers).born);

  return calculateAverage(ageDifferences);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
