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
  const centuriedMen = people
    .filter(person => person.sex === 'm')
    .filter(man => !century || Math.ceil(man.died / 100) === century);

  return centuriedMen
    .filter(person => person.sex === 'm')
    .reduce((acc, person) => (
      acc + person.died - person.born
    ), 0)
  / centuriedMen.length;
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    const mothersList = new Set(people.map(person => person.mother));

    mothersList.delete(null);

    women = women.filter(woman => mothersList.has(woman.name));
  }

  return women
    .reduce((acc, person) => (
      acc + person.died - person.born
    ), 0)
  / women.length;
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
  const peopleWithMother = people
    .filter(person => person.mother !== null)
    .filter(person => !onlyWithSon || person.sex === 'm');
  const mothersList = new Set(people.map(person => person.mother));
  const motherBirthdays = people
    .reduce((mothers, person) => ({
      ...mothers, [person.name]: person.born,
    }), {});
  const accountedMothersList = [...mothersList]
    .filter(mother => motherBirthdays[mother]);

  const peopleWithAccountedMother
    = peopleWithMother
      .filter(person => accountedMothersList.includes(person.mother));

  return peopleWithAccountedMother
    .reduce(
      (acc, person) => (
        acc + person.born - motherBirthdays[person.mother]
      ), 0)
  / peopleWithAccountedMother.length;
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
