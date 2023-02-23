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
  const men = people.filter(person =>
    person.sex === 'm');

  const centuryForMen = century
    ? men.filter(person =>
      Math.ceil(person.died / 100) === century)
    : men;

  const sumOfAge = centuryForMen.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return sumOfAge / centuryForMen.length;
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
  const women = people.filter(person => person.sex === 'f');

  const mothers = withChildren
    ? women.filter(woman =>
      people.some(person => person.mother === woman.name))
    : women;

  const sumOfAge = mothers.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return sumOfAge / mothers.length;
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
  const kid = people.filter(person =>
    people.some(mother => (
      mother.name === person.mother && (
        onlyWithSon
          ? person.sex === 'm'
          : true
      )
    )));

  const averageDifference = kid.reduce((accumulator, person) => {
    const mother = people.find(woman => woman.name === person.mother);

    return accumulator + (person.born - mother.born);
  }, 0);

  return kid.length > 0
    ? averageDifference / kid.length
    : null;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
