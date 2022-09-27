'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of personson's death by 100: Math.ceil(personson.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function averageAge(persons) {
  return persons.reduce((acc, { died, born }) => (
    acc + (died - born)), 0) / persons.length;
};

function calculateMenAverageAge(people, century) {
  const everyMan = people.filter(person => person.sex === 'm');

  return !century
    ? averageAge(everyMan)
    : averageAge(everyMan.filter(person => (
      Math.ceil(person.died / 100) === century)));
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
  const everyWomen = people.filter(person => person.sex === 'f');

  return (withChildren === undefined)
    ? averageAge(everyWomen)
    : averageAge(everyWomen.filter(woman => (
      people.some(person => person.mother === woman.name))));
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at childbirth)
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
  const children = people.filter(person => (
    (onlyWithSon !== undefined)
      ? people.find(woman => woman.name === person.mother)
        && person.sex === 'm'
      : people.find(woman => woman.name === person.mother)
  ));

  return children.reduce((prev, current) => (
    (prev + current.born - people.find(person => (
      (person.name === current.mother))).born)), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
