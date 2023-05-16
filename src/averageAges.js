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
  const male = people.filter(({ sex, died }) =>
    century ? sex === 'm' && Math.ceil(died / 100) === century : sex === 'm');

  return (male.map(({ born, died }) => died - born))
    .reduce((sum, age) => sum + age, 0) / male.length;
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
  const female = people.filter(person =>
    withChildren ? person.sex === 'f' && people
      .some(element => element.mother === person.name)
      : person.sex === 'f');

  return (female.map(({ born, died }) => died - born))
    .reduce((sum, age) => sum + age, 0) / female.length;
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
  const ages = [];

  onlyWithSon ? people.filter(person => {
    people.some(male => {
      if (male.mother === person.name && male.sex === 'm') {
        ages.push(male.born - person.born);
      }
    });
  }) : people.filter(person => {
    people.some(male => {
      if (male.mother === person.name) {
        ages.push(male.born - person.born);
      }
    });
  });

  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
