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
  const males = people
    .filter(person => person.sex.toLowerCase() === 'm'
      && (!century || Math.ceil(person.died / 100) === century));

  return males.reduce(
    (acc, currentPerson) => {
      return acc + currentPerson.died - currentPerson.born;
    }, 0) / males.length;
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
  const female = people
    .filter(person => person.sex.toLowerCase() === 'f'
      && (!withChildren || people.some(child => child.mother === person.name)));

  return female.reduce(
    (acc, currentPerson) => {
      return acc + currentPerson.died - currentPerson.born;
    }, 0) / female.length;
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
  const child = !onlyWithSon
    ? people
      .filter(person => people.some(mother => mother.name === person.mother))
    : people
      .filter(person => person.sex.toLowerCase() === 'm'
      && people.some(mother => mother.name === person.mother));

  return child.reduce(
    (acc, currentPerson) => {
      const mother = people
        .find(person => person.name === currentPerson.mother);

      return acc + currentPerson.born - mother.born;
    }, 0) / child.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
