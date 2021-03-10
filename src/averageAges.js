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
  function calculateCentury(year) {
    return Math.ceil(year / 100);
  }

  const men = people.filter(person => !century
    ? person.sex === 'm'
    : person.sex === 'm' && calculateCentury(person.died) === 18);
  const menAges = men.map(person => person.died - person.born);
  const menAgesSum = menAges.reduce((a, b) => a + b, 0);

  return menAgesSum / menAges.length;
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
  const women = people.filter(person => !withChildren
    ? person.sex === 'f'
    : person.sex === 'f' && people.some(child => child.mother === person.name)
  );

  const womenAges = women.map(person => person.died - person.born);
  const womenAgesSum = womenAges.reduce((a, b) => a + b, 0);

  return womenAgesSum / womenAges.length;
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
