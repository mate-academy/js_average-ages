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
  const men = people
    .filter(person =>
      person.sex === 'm'
      && (century === Math.ceil(person.died / 100) || !century)
    );

  const menAge = men
    .map(age => age.died - age.born);

  const medianAge = menAge
    .reduce((prev, current) => prev + current, 0) / menAge.length;

  return medianAge;
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
  const women = people
    .filter(
      person => person.sex === 'f'
      && (people.find(child => child.mother === person.name) || !withChildren)
    );

  const womenAge = women
    .map(age => age.died - age.born);

  const medianAge = womenAge
    .reduce((prev, current) => prev + current, 0) / womenAge.length;

  return medianAge;
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
  const children = people
    .filter(
      child => people.some(person => child.mother === person.name)
      && (child.sex === 'm' || !onlyWithSon));

  const mothers = children
    .map(child => people
      .find(mother => mother.name === child.mother));

  const ageDifference = children
    .map((child, index) =>
      child.born - mothers[index].born);

  const medianAge = ageDifference
    .reduce((prev, current) => prev + current, 0) / ageDifference.length;

  return medianAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
