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
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const manAge = men.map(man => man.died - man.born);
  const averageMenAge = manAge.reduce((age1, age2) => (
    age1 + age2
  )) / manAge.length;

  return averageMenAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(child => child.mother === person.name)
    : person.sex === 'f');

  const womanAge = women.map(woman => woman.died - woman.born);
  const averageWomenAge = womanAge.reduce((age1, age2) => (
    age1 + age2
  )) / womanAge.length;

  return averageWomenAge;
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
  const mothers = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(mother => mother.name === person.mother)
    : people.some(mother => mother.name === person.mother)
  );
  const difference = mothers.map(child => child.born - people
    .find(mother => mother.name === child.mother).born);

  const averageDifference = difference.reduce((dif1, dif2) => (
    dif1 + dif2
  )) / difference.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
