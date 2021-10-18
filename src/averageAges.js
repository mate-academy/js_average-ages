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
  const males = people.filter(person => person.sex === 'm');
  const malesFromCentury = males
    .filter(male => Math.ceil(male.died / 100) === century);

  const malesForCalculations = century ? malesFromCentury : males;

  const malesAges = malesForCalculations
    .map(person => person.died - person.born);

  const numberOfMales = malesAges.length;

  const output = malesAges
    .reduce((sum, age) => sum + age, 0) / numberOfMales;

  return output;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const females = people.filter(person => person.sex === 'f');
  const femalesWithChildren = females
    .filter(female => people.some(person => person.mother === female.name));

  const femalesForCalculations = withChildren ? femalesWithChildren : females;

  const femalesAges = femalesForCalculations
    .map(person => person.died - person.born);

  const numberOfFemales = femalesAges.length;

  const output = femalesAges
    .reduce((sum, age) => sum + age, 0) / numberOfFemales;

  return output;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(
    child => people.some(mother => mother.name === child.mother));
  const sons = children.filter(child => child.sex === 'm');

  const actualArray = onlyWithSon ? sons : children;

  return actualArray.reduce((sum, child) => {
    const motherRef = people.find(mother => mother.name === child.mother);

    return sum + (child.born - motherRef.born);
  }, 0) / actualArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
