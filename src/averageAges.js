'use strict';

/**
 * Implement calculateMenAverageAge function
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculatePersonsAvgAge(persons) {
  const calcAges = persons.map(person => person.died - person.born);
  const personAvgAge = (calcAges.reduce((total, age) =>
    (total + age)) / calcAges.length);

  return personAvgAge;
}

function calculateMenAverageAge(people, century) {
  let menOnly = people.filter(man => (man.sex === 'm'));

  if (century) {
    menOnly = menOnly.filter(man => (Math.ceil(man.died / 100) === century));
  }
  /*
  if century is valid, only those men added to the array,
  whos died in the given century, easy to add more params in future.
  */

  return calculatePersonsAvgAge(menOnly);
}

/**
 * Implement calculateWomenAverageAge function
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map(eachPerson => eachPerson['mother']);
  let womenOnly = people.filter(woman => woman.sex === 'f');

  if (withChildren) {
    womenOnly = people.filter(woman => woman.sex === 'f'
    && mothers.includes(woman.name));
  }
  /**
  * when withChildren is valid, it checks if a person is a mother
  */

  return calculatePersonsAvgAge(womenOnly);
}

/**
 * Implement calculateAverageAgeDiff function.
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = people;

  if (onlyWithSon) {
    children = people.filter(person => person.sex === 'm');
  }

  function calcMotherChildDiff(obj) {
    const motherId = people.findIndex(mother => mother.name === obj.mother);

    if (motherId > -1) {
      return obj.born - people[motherId].born;
    }
  }

  const getAllAgeDiff = children.map(person =>
    calcMotherChildDiff(person));
  /**
   * ageDiffAll have some undefined values,
   * when mother is not listed in 'people'.
   * validAgeDiff solve this problem.
   */
  const validAgeDiff = getAllAgeDiff.filter(age => age);

  return (validAgeDiff.reduce((total, age) =>
    total + age)) / validAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
