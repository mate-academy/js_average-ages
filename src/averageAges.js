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

function calculateAverageAge(sourseArr) {
  return sourseArr.reduce((avg, person, i, arr) => (
    avg + (person.died - person.born) / arr.length
  ), 0);
}

function calculateMenAverageAge(people, century) {
  const menOfCentury = people
    .filter(person => person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century));

  return calculateAverageAge(menOfCentury);
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
  const mothersList = withChildren
    ? new Set(people.map(person => person.mother))
    : undefined;

  const womenWithChildren = people
    .filter(person => (
      person.sex === 'f' && (!withChildren || mothersList.has(person.name))
    ));

  return calculateAverageAge(womenWithChildren);
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
  const motherBirthdays = people
    .reduce((mothers, person) => ({
      ...mothers, [person.name]: person.born,
    }), {});
  const mothersList = new Set(people.map(person => person.mother));
  const accountedMothersList = [...mothersList]
    .filter(mother => motherBirthdays[mother]);

  return people
    .filter(person => (
      (!onlyWithSon || person.sex === 'm')
      && person.mother !== null
      && accountedMothersList.includes(person.mother)
    ))
    .reduce(
      (acc, person, i, arr) => (
        acc + (person.born - motherBirthdays[person.mother]) / arr.length
      ), 0);
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
