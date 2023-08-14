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
const ONE_CENTURY = 100;
const calculateAgeSum = (data) => {
  return data.reduce((averageAge, { born, died }) => {
    const age = died - born;

    return averageAge + age;
  }, 0);
};

function calculateMenAverageAge(people, century = false) {
  const men = people.filter(({ sex, died }) => {
    const personCentury = Math.ceil(died / ONE_CENTURY);
    const isSuitableCenruty = century ? century === personCentury : true;

    return sex === MALE_SEX && isSuitableCenruty;
  });

  const menSumAge = calculateAgeSum(men);

  return menSumAge / men.length;
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
  const women = people.filter(({ sex, name }) => {
    const isMother = withChildren
      ? people.find(({ mother }) => mother === name)
      : true;

    return sex === FEMALE_SEX && isMother;
  });

  const womenSumAge = calculateAgeSum(women);

  return womenSumAge / women.length;
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
  const childrenWithMothers = people.filter(({ mother, sex }) => {
    const isMotherInList = people.some(({ name }) => name === mother);
    const isMaleIfNeeded = onlyWithSon ? sex === MALE_SEX : true;

    return isMotherInList && isMaleIfNeeded;
  });

  const sumAgeDifference = childrenWithMothers
    .reduce((ageDifferenceSum, { born, mother }) => {
      const motherOfChild = people.find(({ name }) => name === mother);
      const ageDifference = born - motherOfChild.born;

      return ageDifferenceSum + ageDifference;
    }, 0);

  return sumAgeDifference / childrenWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
