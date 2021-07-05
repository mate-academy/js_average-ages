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

// eslint-disable-next-line max-len
const averageAge = (people) => people.reduce((acc, person) =>
  acc + person.died - person.born, 0) / people.length;

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  return averageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people
    .filter(person => withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f');

  return averageAge(women);
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
  const children = people.filter(person => onlyWithSon
    ? people.some(mom => mom.name === person.mother && person.sex === 'm')
    : people.find(mom => mom.name === person.mother)
  );

  const ageDifference = children.map(age =>
    age.born - people.find(mom => mom.name === age.mother).born
  );

  return ageDifference.reduce((count, person) => count + person)
  / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
