'use strict';

// const people = require('./people');
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

function averageAge(people) {
  return (
    people.reduce((years, person) => years + (person.died - person.born), 0) /
    people.length
  );
}

function isChildren(people, motherName) {
  return people.some((person) => person.mother === motherName);
}

function hasMother(people, mother) {
  return people.some((person) => person.name === mother);
}

function calculateMenAverageAge(people, century) {
  const filteredPeople = people.filter((person) => {
    const personCentury = Math.ceil(person.died / 100);

    return century
      ? personCentury === century && person.sex === 'm'
      : person.sex === 'm';
  });

  return averageAge(filteredPeople);
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
  const filteredPeople = people.filter((person) => {
    return withChildren
      ? isChildren(people, person.name) && person.sex === 'f'
      : person.sex === 'f';
  });

  return averageAge(filteredPeople);
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
  const filteredPeople = people.filter((person) => {
    return onlyWithSon
      ? hasMother(people, person.mother) && person.sex === 'm'
      : hasMother(people, person.mother);
  });

  const ageDiff = filteredPeople.reduce((years, person) => {
    const mother = people.find((woman) => woman.name === person.mother);

    return years + (person.born - mother.born);
  }, 0);

  return ageDiff / filteredPeople.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
