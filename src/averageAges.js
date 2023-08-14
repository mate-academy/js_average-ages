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
  const MALE = 'm';
  const YEARS_IN_CENTURY = 100;
  const men = people
    .filter(({ sex, died }) =>
      (!century || Math.ceil(died / YEARS_IN_CENTURY) === century)
      && sex === MALE);

  return men.length && getAverageAge(men);
}

function getAverageAge(people) {
  return people
    .reduce((totalAge, { born, died }) =>
      totalAge + (died - born), 0) / people.length;
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

function womenWithChildren(people, motherName) {
  return people.find(person => person.mother === motherName);
}

function calculateWomenAverageAge(people, withChildren) {
  const FEMALE = 'f';
  const women = people
    .filter(({ sex, name }) =>
      (!withChildren || womenWithChildren(people, name))
      && sex === FEMALE);

  return women.length && getAverageAge(women);
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
  const MALE = 'm';
  const FEMALE = 'f';
  const women = people.filter(({ sex }) => sex === FEMALE);

  const children = people
    .filter(({ sex, mother }) =>
      mother !== null && (!onlyWithSon || sex === MALE));

  const ageDifferences = children
    .map(child => {
      const mother = women.find(woman => woman.name === child.mother);

      return mother ? child.born - mother.born : null;
    })
    .filter(diff => diff);

  const avAgeDiff = ageDifferences
    .reduce((sum, age) => sum + age) / ageDifferences.length;

  return avAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
