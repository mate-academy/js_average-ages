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
const SEX_MALE = 'm';
const SEX_FEMALE = 'f';

function calculateMenAverageAge(people, century = null) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const centuryValue = 100;
  const men = people
    .filter(person => person.sex === SEX_MALE);
  const filteredMen = century !== null
    ? men
      .filter(person => Math.ceil(person.died / centuryValue) === century)
    : men;

  const amountAge = filteredMen
    .reduce((sum, person) =>
      sum + (person.died - person.born), 0);

  const avarageMenAge = amountAge / filteredMen.length;

  return avarageMenAge;
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
  const wooman = people
    .filter(person => person.sex === SEX_FEMALE);
  const filteredWooman = wooman
    .filter(woman => withChildren
      ? people.some(person => person.mother === woman.name)
      : true
    );

  const ageAmount = filteredWooman
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  const aerageWoomanAge = ageAmount / filteredWooman.length;

  return aerageWoomanAge;
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
  const mothers = people
    .filter(mom =>
      people
        .some(child => child.mother === mom.name));

  const childrenWithMother = people
    .filter(child =>
      (!onlyWithSon && mothers
        .some(mom => mom.name === child.mother))
    || (onlyWithSon && child.sex === SEX_MALE
    && mothers
      .some(mom => mom.name === child.mother))
    );

  const ageDifferenceAmount = childrenWithMother
    .reduce((diffSum, child) => {
      const mother = mothers
        .find(mom => mom.name === child.mother);
      const ageDifference = child.born - mother.born;

      return diffSum + ageDifference;
    }, 0);

  return ageDifferenceAmount / childrenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
