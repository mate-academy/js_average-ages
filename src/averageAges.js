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
  const men = people.filter(({ sex, died }) => (sex === 'm' && (
    century
      ? century === Math.ceil(died / 100)
      : true
  )));

  const menAges = men.map(({ born, died }) => died - born);

  return calculateAverage(menAges);
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
  const women = people.filter(({ sex, name }) => (sex === 'f' && (
    withChildren
      ? people.some(({ mother }) => mother === name)
      : true
  )));

  const womenAges = women.map(({ born, died }) => died - born);

  return calculateAverage(womenAges);
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
  const peopleWithMother = people.filter(person => people.some(mother => (
    mother.name === person.mother
    && (onlyWithSon ? person.sex === 'm' : true)
  )));

  const ageDifferences = peopleWithMother.map((person) => {
    const personMother = people.find(mother => mother.name === person.mother);

    return person.born - personMother.born;
  });

  return calculateAverage(ageDifferences);
}

/**
 * Function to calculate average of numbers array
 * Returns the average rounded to 2 decimal digits
 *
 * @param {number[]} numbers
 *
 * @return {number}
 */
function calculateAverage(numbers) {
  const sumOfNumbers = numbers.reduce((sum, age) => sum + age, 0);

  return Math.round((sumOfNumbers / numbers.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
