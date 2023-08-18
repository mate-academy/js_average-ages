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
const CENTURY_VALUE = 100;

function calculateAverage(people) {
  return people.reduce((sumAges, person) => {
    const age = person.died - person.born;

    return sumAges + age;
  }, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const menDiedInTargetCentury = people
    .filter(person => {
      const diedCentury = Math.ceil(person.died / CENTURY_VALUE);

      const isTargetCenturySpecified = century
        ? person.sex === MALE_SEX && century === diedCentury
        : person.sex === MALE_SEX;

      return isTargetCenturySpecified;
    });

  return calculateAverage(menDiedInTargetCentury);
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
  const womenFilter = people
    .filter(person => {
      const hasMotherInList
      = people.some(woman => person.name === woman.mother);

      const isWithChildrenSpecified = withChildren
        ? person.sex === FEMALE_SEX && withChildren === hasMotherInList
        : person.sex === FEMALE_SEX;

      return isWithChildrenSpecified;
    });

  return calculateAverage(womenFilter);
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
  const childrenWithMother = people.filter(person => {
    return onlyWithSon
      ? people.find(woman => person.sex === MALE_SEX
        && person.mother === woman.name)
      : people.find(woman => person.mother === woman.name);
  });

  return childrenWithMother.reduce((acc, child) => {
    const motherAge = people.find(woman => {
      return child.mother === woman.name;
    }).born;

    return acc + child.born - motherAge;
  }, 0) / childrenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
