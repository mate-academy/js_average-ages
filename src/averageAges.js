'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'
  );

  const averageAgeOfMen = men.reduce(
    (sum, age) => sum + (age.died - age.born), 0
  ) / men.length;

  return roundAge(averageAgeOfMen);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? people.some(
      child => child.mother === person.name) && person.sex === 'f'
    : person.sex === 'f'
  );

  const averageAgeOfWomen = women.reduce(
    (sum, age) => sum + (age.died - age.born), 0
  ) / women.length;

  return roundAge(averageAgeOfWomen);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => onlyWithSon
    ? people.some(
      child => child.name === person.mother
    ) && person.sex === 'm'
    : people.some(
      child => child.name === person.mother)
  );

  const diffBetweenMomAndKid = children.reduce(
    (sum, son) => sum + (
      son.born - people.find(
        motherOfSon => motherOfSon.name === son.mother).born), 0
  ) / children.length;

  return diffBetweenMomAndKid;
}

function roundAge(age) {
  return +age.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
