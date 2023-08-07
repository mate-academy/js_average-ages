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
  const ONE_CENTURY = 100;
  const FEMALE = 'f';

  const menInCentury = people
    .filter(person => {
      if (person.sex === FEMALE) {
        return false;
      }

      if (!century) {
        return true;
      }

      const currentCentury = Math.ceil(person.died / ONE_CENTURY);

      return currentCentury === century;
    });

  const sumAgesMenInCentury = menInCentury
    .reduce((sumAges, person) => sumAges + (person.died - person.born), 0);

  const amountMenInCentury = menInCentury.length;

  const menAverageAge = +(sumAgesMenInCentury / amountMenInCentury).toFixed(2);

  return menAverageAge;
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
  const FEMALE = 'f';

  let women = people
    .filter(person => person.sex === FEMALE);

  if (withChildren) {
    const mothers = people
      .filter(person => person.mother !== null)
      .map(person => person.mother);

    women = women
      .filter(person => mothers.includes(person.name));
  }

  const sumAgesWomen = women
    .reduce((sumAges, person) => sumAges + (person.died - person.born), 0);

  const amountWomen = women.length;

  const womenAverageAge = +(sumAgesWomen / amountWomen).toFixed(2);

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
  const MALE = 'm';

  let peopleWithMother = people
    .filter(person => person.mother !== null);

  if (onlyWithSon) {
    peopleWithMother = peopleWithMother
      .filter(person => person.sex === MALE);
  }

  const mothersNames = peopleWithMother
    .map(person => person.mother);

  const mothersWithChildren = people
    .filter(person => mothersNames.includes(person.name));

  peopleWithMother = peopleWithMother
    .filter(person => mothersWithChildren
      .find(mom => mom.name === person.mother));

  const sumAgesDiff = peopleWithMother
    .reduce((sumAge, person) => {
      const mother = mothersWithChildren
        .find(mom => mom.name === person.mother);

      return sumAge + (person.born - mother.born);
    }, 0);

  const amountPeopleWithMother = peopleWithMother.length;

  const averageAgeDiff = +(sumAgesDiff / amountPeopleWithMother).toFixed(2);

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
