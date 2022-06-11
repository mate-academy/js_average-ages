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
  const men = people.filter(
    century !== undefined
      ? person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century
      : person => person.sex === 'm'
  );

  const agesOfMen = men.map(man => man.died - man.born);

  const averageAge = agesOfMen.reduce((age1, age2) => age1 + age2)
    / agesOfMen.length;

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
function calculateWomenAverageAge(people, withChildren) {
  function findMother(person) {
    return people.find(woman => woman.mother === person.name);
  }

  const femaleGender = people.filter(person => person.sex
    === 'f');

  const womenHasCHild
   = people.filter(person => findMother(person) && femaleGender);

  const women
  = withChildren !== undefined
    ? womenHasCHild
    : femaleGender;

  const womenAges = women.map(woman => woman.died - woman.born);
  const womenAverageAge = womenAges.reduce((age1, age2) => age1 + age2)
    / womenAges.length;

  return womenAverageAge;
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
  function findMothers(child) {
    return people.find(mother => mother.name === child.mother);
  }

  function findFamily(child) {
    const boy = child.sex === 'm';

    return onlyWithSon
      ? boy && findMothers(child)
      : findMothers(child);
  }

  const family = people.filter(findFamily);

  const ageDifferences = family.map(child => {
    return child.born - findMothers(child).born;
  }
  );

  const averageAgeDifference
    = ageDifferences.reduce((ageGap1, ageGap2) =>
      ageGap1 + ageGap2) / ageDifferences.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
