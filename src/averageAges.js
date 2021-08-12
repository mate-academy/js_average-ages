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
function calculateAge(result, died, born) {
  return result + (died - born);
}

function calculateMenAverageAge(people, century) {
  const men = century === undefined
    ? people.filter(person => person.sex === 'm')
    : people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century
    );

  const menAverageAge = men.reduce((result, { died, born }) =>
    calculateAge(result, died, born), 0) / men.length;

  return menAverageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  // write code here
  const women = people.filter(person => person.sex === 'f');

  const womenAverageAge = women
    .reduce((result, { died, born }) =>
      calculateAge(result, died, born), 0) / women.length;

  const womenWithChildren = women
    .filter(woman =>
      people.some(person => woman.name === person.mother)
    );

  const womenAgeWithChildren = womenWithChildren
    .reduce((result, { died, born }) =>
      calculateAge(result, died, born), 0) / womenWithChildren.length;

  return withChildren ? womenAgeWithChildren : womenAverageAge;
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
  // write code here
  const women = people.filter(person => person.sex === 'f');

  const children = onlyWithSon
    ? people.filter(person => women.some(woman =>
      person.mother === woman.name && person.sex === 'm')
    )
    : people.filter(person =>
      women.some(woman => person.mother === woman.name)
    );

  const sumAgesDiff = children.map(child => {
    let count = 0;

    people.map(person => {
      child.mother === person.name
        ? count += child.born - person.born : count += 0;
    });

    return count;
  }).reduce((a, b) => a + b, 0);

  let averageAgeDiff = sumAgesDiff / children.length;

  averageAgeDiff = +averageAgeDiff.toFixed(2);

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
