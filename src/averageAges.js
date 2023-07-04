'use strict';

const MALE = 'm';
const FEMALE = 'f';
const PERSON_GENDER = 'sex';
const CENTURY = 100;

function isFemale(people) {
  for (const person of people) {
    if (person[PERSON_GENDER] === FEMALE) {
      return true;
    }

    return false
  }
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
  const maleFiltered = people.filter((person) => !isFemale([person]));

  const centuryFiltered = maleFiltered.filter((person) => {
    const calculatedCentury = (Math.ceil(person.died / CENTURY));

    return century === calculatedCentury;
  });

  const averageAge = !century
    ? maleFiltered.reduce((prev, person) =>
      prev + (person.died - person.born), 0) / maleFiltered.length
    : centuryFiltered.reduce((prev, person) =>
      prev + (person.died - person.born), 0) / centuryFiltered.length;

  return averageAge;
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
  const femaleFiltered = people.filter((person) => isFemale([person]));

  const withChildrenFiltered = femaleFiltered.filter((person) => {
    return people.find((child) => child.mother === person.name);
  });

  const averageAge
    = !withChildren
      ? femaleFiltered.reduce((prev, person) =>
        prev + (person.died - person.born), 0) / femaleFiltered.length
      : withChildrenFiltered.reduce((prev, person) =>
        prev + (person.died - person.born), 0) / withChildrenFiltered.length;

  return averageAge;
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
  const withMothers = people.filter(child =>
    !onlyWithSon
      ? people.some((person) => child.mother === person.name)
      : people.some((person) => (child.mother === person.name)
        && !isFemale([child]))
  );

  const calculateDiff = withMothers.reduce((prev, child) => {
    const motherObj = people.find((mother) => mother.name === child.mother);
    const ageDiff = child.born - motherObj.born;

    return prev + ageDiff;
  }, 0);

  return calculateDiff / withMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
