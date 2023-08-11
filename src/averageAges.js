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
function calculateMenAverageAge(people, century = null) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const MEN = people.filter(person => person.sex === 'm');
  const FILTERED_MEN = century !== null
    ? MEN.filter(person => Math.ceil(person.died / 100) === century) : MEN;
  const TOTAL_MEN = FILTERED_MEN;
  const SUM_AGE = TOTAL_MEN.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const AVERAGE_MEN_AGE = SUM_AGE / TOTAL_MEN.length;

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
  // write code here
  const WOOMEN = people.filter(person => person.sex === 'f');
  const FILTERED_WOOMEN = WOOMEN.filter(woman =>
    withChildren ? people.some(person => person.mother === woman.name) : true
  );
  const TOTAL_WOOMEN = FILTERED_WOOMEN;
  const SUM_AGE = TOTAL_WOOMEN.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const AVERAGE_WOOMAN_AGE = SUM_AGE / TOTAL_WOOMEN.length;

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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const MOTHERS = people.filter(mom =>
    people.some(child => child.mother === mom.name));

  const CHILDREN_WITH_MOTHERS = people.filter(child =>
    (!onlyWithSon && MOTHERS.some(mom => mom.name === child.mother))
    || (onlyWithSon && child.sex === 'm'
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
