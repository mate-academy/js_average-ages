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
  const menFormPeople
    = people
      .filter(person => person.sex === 'm');

  const menFormPeopleByCentury
    = menFormPeople
      .filter(man => Math.ceil(man.died / 100) === century);

  const menAges
    = (century === undefined ? menFormPeople : menFormPeopleByCentury)
      .map(man => man.died - man.born);

  const averageAge
    = menAges.reduce((previousAge, currentAge) => (
      previousAge + currentAge
    ), 0)
    / menAges.length;

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
  const womenFormPeople
    = people.filter(person => person.sex === 'f');

  const womenWithChildren
    = womenFormPeople
      .filter(woman => people
        .some((person) => person.mother === woman.name));

  const womenAges
    = (withChildren ? womenWithChildren : womenFormPeople)
      .map(woman => woman.died - woman.born);

  const averageAge
    = womenAges.reduce((previousAge, currentAge) => (
      previousAge + currentAge
    ), 0)
    / womenAges.length;

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
function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleWithMother
    = people.filter(person => people
      .some(findMom => person.mother === findMom.name));

  const manWithMother
    = peopleWithMother.filter(person => person.sex === 'm');

  const differenceAges
    = (onlyWithSon ? manWithMother : peopleWithMother)
      .map(man => (man.born - people
        .find(person => person.name === man.mother).born));

  const averageAge
    = differenceAges
      .reduce((previousValue, currentValue) => (
        previousValue + currentValue
      ), 0)
    / differenceAges.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
