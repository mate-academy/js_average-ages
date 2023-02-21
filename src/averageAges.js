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
  const men = people.filter(({ sex, died }) => (
    sex === 'm' && (
      century
        ? century === Math.ceil(died / 100)
        : true
    )));

  const sumOfMenAges = men
    .reduce((sum, { born, died }) => sum + (died - born), 0);

  return divideAndRound(sumOfMenAges, men.length);
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
  const women = people.filter(({ sex, name }) => (
    sex === 'f' && (
      withChildren
        ? people.some(({ mother }) => mother === name)
        : true
    )));

  const sumOfWomenAges = women
    .reduce((sum, { born, died }) => sum + (died - born), 0);

  return divideAndRound(sumOfWomenAges, women.length);
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
  const peopleWithMother = people.filter(person => people
    .some(mother => (
      mother.name === person.mother && (
        onlyWithSon
          ? person.sex === 'm'
          : true
      )
    ))
  );

  const ageDifferences = peopleWithMother.map((person) => {
    const personMother = people
      .find(mother => mother.name === person.mother);

    return person.born - personMother.born;
  });

  const sumOfDifferences = ageDifferences
    .reduce((sum, age) => sum + age, 0);

  return divideAndRound(sumOfDifferences, ageDifferences.length);
}

/**
 * Function to divide two values (a / b)
 * Returns the result rounded to 2 decimal digits
 *
 * @param {number} a
 * @param {number} b
 *
 * @return {number}
 */
const divideAndRound = (a, b) => Math.round((a / b) * 100) / 100;

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
