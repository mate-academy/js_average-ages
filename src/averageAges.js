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
 *
 */

function peopleAgeArray(people) {
  return people
    .map(person => person.died - person.born)
    .reduce((ageOne, ageTwo) => ageOne + ageTwo, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const filterPeople = people
    .filter(person => person.sex === 'm' && filterCentury(person));

  function filterCentury(person) {
    const age = Math.ceil(person.died / 100);

    return century ? age === century : true;
  }

  return peopleAgeArray(filterPeople);
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
  const filterWoman = people
    .filter(person => person.sex === 'f' && filterChildren(person));

  function filterChildren(person) {
    return withChildren
      ? people.some(element => element.mother === person.name)
      : true;
  }

  return peopleAgeArray(filterWoman);
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

  const curentPeople = (onlyWithSon)
    ? people.filter(person => person.sex === 'm')
    : [...people];

  const findmother = curentPeople
    .filter(element => people.find(maser => maser.name === element.mother));

  const diferenAga = findmother
    .reduce((diferntOne, diferntTwo) => diferntOne + (diferntTwo.born - people
      .find(mother => diferntTwo.mother === mother.name).born), 0)
      / findmother.length;

  return diferenAga;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
