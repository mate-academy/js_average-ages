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

function averageAge(ages) {
  return ages.reduce((previousAge, currentAge) => (
    previousAge + currentAge
  )) / ages.length;
}

function calculateMenAverageAge(people, century) {
  const menFormPeople = people.filter(person => (
    person.sex === 'm'
  ));

  const menFormPeopleByCentury = menFormPeople.filter(man => (
    Math.ceil(man.died / 100) === century
  ));

  const menAges = (century ? menFormPeopleByCentury : menFormPeople)
    .map(man => (
      man.died - man.born
    ));

  return averageAge(menAges);
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
  const womenFormPeople = people.filter(person => (
    withChildren
      ? people.some((isChild) => (
        isChild.mother === person.name
      ))
      : person.sex === 'f'
  ));

  const womenAges = womenFormPeople.map(woman => (
    woman.died - woman.born
  ));

  return averageAge(womenAges);
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
  const peopleWithMother = people.filter(person => (
    onlyWithSon
      ? people.some(findMom => (
        person.mother === findMom.name
      ))
        && person.sex === 'm'
      : people.some(findMom => (
        person.mother === findMom.name
      ))
  ));

  const differenceAges = peopleWithMother.map(man => (
    man.born - people.find(person => (
      person.name === man.mother
    )).born));

  return averageAge(differenceAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
