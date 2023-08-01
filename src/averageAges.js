/* eslint-disable padding-line-between-statements */
/* eslint-disable max-len */
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
  const man = people.filter(person => person.sex === 'm' && (!century || Math.ceil(person.died / 100) === century));

  const sumOfAge = man.reduce((sum, person) => sum + (person.died - person.born), 0);

  return sumOfAge / man.length;
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
  const women = people.filter(person => person.sex === 'f' && (!withChildren || people.some(child => child.mother === person.name)));

  const totalAge = women.reduce((sum, woman) => sum + (woman.died - woman.born), 0);

  return totalAge / women.length;
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
  const peopleWithMothers = people.filter(person => person.mother && (!onlyWithSon || person.sex === 'm'));

  const { totalAgeDiff, validCount } = peopleWithMothers
    .reduce(
      (acc, person) => {
        const mother = people.find(mothers => mothers.name === person.mother);
        return {
          totalAgeDiff: acc.totalAgeDiff + (mother ? person.born - mother.born : 0),
          validCount: acc.validCount + (mother ? 1 : 0),
        };
      },
      {
        totalAgeDiff: 0,
        validCount: 0,
      }
    );

  return totalAgeDiff / validCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
