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

const ONE_HUNDRED_YEARS = 100;
const MALE_SEX = 'm';
const FEMALE_SEX = 'f';

function calculateMenAverageAge(people, century = null) {
  const MEN = people.filter(person => person.sex === MALE_SEX);
  const FILTERED_MEN = century !== null
    ? MEN.filter(person => Math.ceil(person.died
      / ONE_HUNDRED_YEARS) === century)
    : MEN;
  const SUM_AGE = FILTERED_MEN.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const AVERAGE_MEN_AGE = SUM_AGE / FILTERED_MEN.length;

  return AVERAGE_MEN_AGE;
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
  const WOOMEN = people.filter(person => person.sex === FEMALE_SEX);
  const FILTERED_WOOMEN = withChildren !== false ? WOOMEN.filter(woman =>
    withChildren
      ? people.some(person =>
        person.mother === woman.name)
      : true)
    : WOOMEN;
  const SUM_AGE = FILTERED_WOOMEN.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const AVERAGE_WOOMAN_AGE = SUM_AGE / FILTERED_WOOMEN.length;

  return AVERAGE_WOOMAN_AGE;
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
  const MOTHERS = people.filter(mom =>
    people.some(child => child.mother === mom.name));

  const CHILDREN_WITH_MOTHERS = people.filter(child =>
    (!onlyWithSon && MOTHERS.some(mom => mom.name === child.mother))
    || (onlyWithSon && child.sex === MALE_SEX
    && MOTHERS.some(mom => mom.name === child.mother))
  );

  const AGE_DIFF_SUM = CHILDREN_WITH_MOTHERS.reduce((diffSum, child) => {
    const mother = MOTHERS.find(mom => mom.name === child.mother);
    const ageDiff = child.born - mother.born;

    return diffSum + ageDiff;
  }, 0);

  return AGE_DIFF_SUM / CHILDREN_WITH_MOTHERS.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
