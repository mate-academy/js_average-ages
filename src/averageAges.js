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
  let men = people.filter(person => person.sex === 'm');

  men = (century)
    ? men.filter(person => (Math.ceil(person.died / 100) === century))
    : men;

  const sumMenAge = men
    .reduce((sum, person) => sum + person.died - person.born, 0);

  return +(sumMenAge / men.length).toFixed(2);
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
  const females = (withChildren)
    ? people.filter(mom => people.some(child => mom.name === child.mother))
    : people.filter(person => person.sex === 'f');

  const sumMenAge = females
    .reduce((sum, person) => sum + person.died - person.born, 0);

  return +(sumMenAge / females.length).toFixed(2);
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
  let babyWithMom = people
    .filter(baby => people.some(mom => mom.name === baby.mother));

  babyWithMom = (onlyWithSon)
    ? babyWithMom.filter(baby => baby.sex === 'm')
    : babyWithMom;

  const agesDiff = babyWithMom
    .map(baby => baby.born - people.find(mom => mom.name === baby.mother).born);
  const sumAges = agesDiff.reduce((sum, age) => sum + age);

  return +(sumAges / agesDiff.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
