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
function calculateMenAverageAge(people, century = false) {
  const MALE_SEX = 'm';
  const menFilteredArray = people.filter(({ sex, died }) => {
    const personCentury = Math.ceil(died / 100);
    const isSuitableCenruty = century ? century === personCentury : true;

    return sex === MALE_SEX && isSuitableCenruty;
  });

  const menSumAge = menFilteredArray.reduce((averageAge, { born, died }) => {
    const age = died - born;

    return averageAge + age;
  }, 0);

  return menSumAge / menFilteredArray.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const FEMALE_SEX = 'f';
  const womenFilteredArray = people.filter(({ sex, name }) => {
    const isMother = withChildren
      ? people.find(({ mother }) => mother === name)
      : true;

    return sex === FEMALE_SEX && isMother;
  });

  const womenSumAge = womenFilteredArray
    .reduce((averageAge, { born, died }) => {
      const age = died - born;

      return averageAge + age;
    }, 0);

  return womenSumAge / womenFilteredArray.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const MALE_SEX = 'm';
  const childrenWithMothers = people.filter(({ mother, sex }) => {
    const isMotherInList = people.find(({ name }) => name === mother);
    const isMaleIfNeeded = onlyWithSon ? sex === MALE_SEX : true;

    return isMotherInList && isMaleIfNeeded;
  });

  const sumAgeDifference = childrenWithMothers
    .reduce((ageSum, { born, mother }) => {
      const motherOfChild = people.find(({ name }) => name === mother);
      const ageDifference = born - motherOfChild.born;

      return ageSum + ageDifference;
    }, 0);

  return sumAgeDifference / childrenWithMothers.length;
}

// 1. find a mother of each person (or only for men)
// 2. keep people who have mothers in the array
// 3. calculate the difference child.born - mother.born
// 4. return the average value

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
