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
function calculateMenAverageAge(people, century) {
  const MALE_SEX = 'm';
  const YEARS_IN_CENTURY = 100;

  const menList = people.filter((person) => {
    return century
      ? person.sex === MALE_SEX
        && Math.ceil(person.died / YEARS_IN_CENTURY) === century
      : person.sex === MALE_SEX;
  });
  const menAvgAge = menList.reduce((prev, person) => (
    prev + (person.died - person.born)
  ), 0) / menList.length;

  return menAvgAge;
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
  const FEMALE_SEX = 'f';

  const womenList = people.filter((person) => {
    return withChildren
      ? person.sex === FEMALE_SEX
        && people.some((child) => child.mother === person.name)
      : person.sex === FEMALE_SEX;
  });

  const womenAvgAge = womenList.reduce((prev, person) => (
    prev + (person.died - person.born)
  ), 0) / womenList.length;

  return womenAvgAge;
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
  const MALE_SEX = 'm';

  const childrenWithMother = people.filter((child) => {
    return (onlyWithSon && child.sex !== MALE_SEX)
      ? false
      : people.some((mother) => child.mother === mother.name);
  });

  const ageDiff = childrenWithMother.map((child) => {
    const mother = people.find((mom) => mom.name === child.mother);

    return child.born - mother.born;
  });

  const averageAgeDiff = ageDiff.reduce((total, difference) =>
    (total + difference), 0) / ageDiff.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
