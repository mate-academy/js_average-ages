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
const MALE = 'm';
const FEMALE = 'f';
const ONE_CENTURY = 100;

function sumPeopleAges(people) {
  return people
    .reduce((sumAges, person) => sumAges + (person.died - person.born), 0);
}

function calculateMenAverageAge(people, century) {
  const menInCentury = people
    .filter(person => person.sex === MALE && (century
      ? Math.ceil(person.died / ONE_CENTURY) === century
      : true));

  const sumAgesMenInCentury = sumPeopleAges(menInCentury);

  const menAverageAge = +(sumAgesMenInCentury / menInCentury.length).toFixed(2);

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
  const mothersNames = people
    .filter(person => person.mother)
    .map(person => person.mother);

  const women = people
    .filter(person => person.sex === FEMALE
      && (withChildren ? mothersNames.includes(person.name) : true));

  const sumAgesWomen = sumPeopleAges(women);

  const womenAverageAge = +(sumAgesWomen / women.length).toFixed(2);

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

function findMother(people, personMotherName) {
  return people.find(mom => mom.name === personMotherName);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let peopleWithMother = people
    .filter(person => person.mother
      && (onlyWithSon ? person.sex === MALE : true));

  const mothersNames = peopleWithMother
    .map(person => person.mother);

  const mothersWithChildren = people
    .filter(person => mothersNames.includes(person.name));

  peopleWithMother = peopleWithMother
    .filter(person => findMother(mothersWithChildren, person.mother));

  const sumAgesDiff = peopleWithMother
    .reduce((sumAge, person) => {
      const mother = findMother(mothersWithChildren, person.mother);

      return sumAge + (person.born - mother.born);
    }, 0);

  const averageAgeDiff = +(sumAgesDiff / peopleWithMother.length).toFixed(2);

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
