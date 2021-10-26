'use strict';

const calculateAverageAge = arr =>
  arr
    .reduce((prev, curr) => prev + curr, 0)
    / arr.length;

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
  const man = century
    ? people
      .filter(person =>
        person.sex === 'm' && Math.ceil(person.died / 100) === century)
      .map(person =>
        person.died - person.born)
    : people
      .filter(person =>
        person.sex === 'm')
      .map(person =>
        person.died - person.born);

  return calculateAverageAge(man);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const motherNames = [...people]
    .filter(person =>
      person.mother !== null)
    .map(person =>
      person.mother);

  const personsWithMother = withChildren
    ? people
      .filter(person =>
        motherNames
          .includes(person.name))
      .map(person =>
        person.died - person.born)
    : people
      .filter(person =>
        person.sex === 'f')
      .map(person =>
        person.died - person.born);

  return calculateAverageAge(personsWithMother);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const motherNames = [
    ...new Set(
      [...people]
        .filter(person =>
          person.mother !== null
          && [...people]
            .find(mother =>
              mother.name === person.mother))
        .map(person =>
          person.mother)
    )];

  function childrens(hasSon) {
    const peopleByMotherName = [...people]
      .filter(person =>
        motherNames
          .find(mother =>
            mother === person.mother));

    return hasSon
      ? peopleByMotherName
        .filter(person =>
          person.sex === 'm')
      : peopleByMotherName;
  }

  function diff() {
    const motherBorn = childMotherName =>
      [...people]
        .filter(person =>
          motherNames
            .find(mother =>
              mother === person.name))
        .find(person =>
          person.name === childMotherName)
        .born;

    return childrens(onlyWithSon)
      .map(child =>
        child.born - motherBorn(child.mother));
  }

  return calculateAverageAge(diff());
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
