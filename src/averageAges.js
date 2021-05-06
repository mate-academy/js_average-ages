'use strict';

// const { map } = require("./people");

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100:
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
  const ages = men.map(person => person.died - person.born);
  const averageAge = (ages.reduce((a, b) => a + b) / ages.length).toFixed(2);

  return +averageAge;
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
  const mothers = people.filter(person =>
    person.mother).map(person => person.mother);
  const women = withChildren ? people.filter(person =>
    mothers.includes(person.name))
    : people.filter(person => person.sex === 'f');
  const ages = women.map(person => person.died - person.born);
  const averageAge = ages.reduce((a, b) => a + b) / ages.length;

  return averageAge;
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
  const children = people.filter(person => (onlyWithSon)
    ? people.some(mother => mother.name === person.mother) && person.sex === 'm'
    : people.some(mother => mother.name === person.mother));

  const agesDiff = children.map(child =>
    (child.born - people.find(mother => mother.name === child.mother).born));

  return agesDiff.reduce((a, b) => a + b) / agesDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
