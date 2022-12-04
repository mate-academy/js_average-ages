'use strict';

/**
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

  if (century) { // those men who died in the defined century
    menOnly = menOnly.filter(man => (Math.ceil(man.died / 100) === century));
  }

  return calculatePersonsAvgAge(menOnly);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map(eachPerson => eachPerson.mother);
  let womenOnly = people.filter(woman => woman.sex === 'f');

  if (withChildren) { // checks if person is a mother
    womenOnly = womenOnly.filter(woman => mothers.includes(woman.name));
  }

  return calculatePersonsAvgAge(womenOnly);
}

/**
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
    const motherIndex = people.findIndex(mother => mother.name === obj.mother);

    if (motherIndex > -1) {
      return obj.born - people[motherIndex].born;
    }
  }

  const getAllAgeDiff = children.map(person =>
    calcMotherChildDiff(person));
  /**
   * ageDiffAll have some undefined values,
   * when mother is not listed in 'people'.
   * validAgeDiff solve this problem.
   */
  const validAgeDiff = getAllAgeDiff.filter(years => years);

  return (validAgeDiff.reduce((total, years) =>
    total + years)) / validAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
