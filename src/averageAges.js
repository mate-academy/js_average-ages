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
  let man = people.filter(person => person.sex === 'm');

  century && (
    man = man
      .filter(person =>
        Math.ceil(person.died / 100) === century)
  );

  const sumOfAge = man
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  const averageAge = sumOfAge / man.length;

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
function calculateWomenAverageAge(people, withChildren = false) {
  let women = people.filter(person => person.sex === 'f');

  withChildren && (
    women = women
      .filter(woman => people
        .some(person => person.mother === woman.name))
  );

  const totalAge = women
    .reduce((sum, woman) => sum + (woman.died - woman.born), 0);

  const averageAge = totalAge / women.length;

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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let peopleWithMothers = people.filter(person => person.mother);

  onlyWithSon && (
    peopleWithMothers = peopleWithMothers.filter(person => person.sex === 'm')
  );

  const { totalAgeDiff, validCount } = peopleWithMothers
    .reduce(
      (acc, person) => ({
        totalAgeDiff: acc.totalAgeDiff + (people
          .find(mother => mother.name === person.mother) ? person.born - people
            .find(mother => mother.name === person.mother).born : 0),
        validCount: acc.validCount + (people
          .find(mother => mother.name === person.mother) ? 1 : 0),
      }),
      {
        totalAgeDiff: 0, validCount: 0,
      }
    );

  const averageAgeDiff = totalAgeDiff / validCount;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
