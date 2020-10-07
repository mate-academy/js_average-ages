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
  let mens = people.filter(person => person.sex === 'm');

  if (century) {
    mens = mens
      .filter(person => Math.ceil(person.died / 100) === century);
  }

  const sumAges = mens.reduce((sum, { born, died }) => {
    const personAge = (died - born);

    return sum + personAge;
  }, 0);

  return sumAges / mens.length;
}

/**
@@ -34,7 +53,35 @@ function calculateMenAverageAge(people, century) {
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(person => !withChildren
    ? person.sex === 'f'
    : person.sex === 'f' && people.some(child => child.mother === person.name));

  const sumAges = womens.reduce((sum, { born, died }) => {
    const personAge = (died - born);

    return sum + personAge;
  }, 0);

  return sumAges / womens.length;
}

// calculateWomenAverageAge(people, true);

/**
@@ -52,7 +99,39 @@ function calculateWomenAverageAge(people, withChildren) {
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => !onlyWithSon
    ? people.find(mom => person.mother === mom.name)
    : people.find(mom => person.mother === mom.name && person.sex === 'm')
  );

  const agesDifference = children.map(person => person.born
    - people.find(mom => person.mother === mom.name).born);
  const agesDifferenceSum = agesDifference.reduce((a, b) => a + b, 0);

  return agesDifferenceSum / agesDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
