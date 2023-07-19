"use strict";

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
function calculateMenAverageAge(people, century = 0) {
  let filterMan = people.filter(men => men.sex === 'm');

  if (century !== 0) {
    filterMan = filterMan.filter(man => Math.ceil(man.died / 100) === century);
  }

  const result = filterMan.reduce((sum, peson) =>
    sum + (peson.died - peson.born), 0);

  const avarage = result / filterMan.length;

  return avarage;
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
  let woman = people.filter(person => person.sex === 'f');

  if (withChildren !== false) {
    woman = woman
      .filter(person => people
        .some(child => child.mother === person.name));
  }

  const result = woman
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  const avarage = result / woman.length;

  return avarage;
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm' && person.mother !== null)
    : people.filter(person => person.mother !== null);

  const ageDifference = filteredPeople
    .map(person => {
      const mother = people
        .find(p => p.name === person.mother);

      if (mother) {
        return person.born - mother.born;
      }

      return null;
    });

  const validAgeDifference = ageDifference.filter(ageDif => ageDif !== null);
  const totalAgeDifference = validAgeDifference
    .reduce((sum, ageDiff) => sum + ageDiff, 0);
  const avarageAgeDiff = totalAgeDifference / validAgeDifference.length || 0;

  return avarageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
