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
  let menAverageAge = 0;
  const men = people
    .filter(person =>
      century
        ? person.sex === 'm' && Math.ceil(person.died / 100) === century
        : person.sex === 'm')
    .map(person => (person.died - person.born));

  menAverageAge = men
    .reduce((SumAge, manAge) =>
      SumAge + manAge) / men.length;

  return menAverageAge;
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
  let womenAverageAge = 0;
  const women = people.filter(person =>
    withChildren
      ? person.sex === 'f'
        && people.some((child) => person.name === child.mother)
      : person.sex === 'f');
  const womenWithChildren = women.map(woman => (woman.died - woman.born));

  womenAverageAge = womenWithChildren
    .reduce((accumulator, currentValue) =>
      accumulator + currentValue) / womenWithChildren.length;

  return womenAverageAge;
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
  let averageAgeDiff = 0;
  let children = people.filter(
    child => people.find(mom => (mom.name === child.mother))
  );

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const womenAges = children
    .map(child => (
      child.born - (people.find(mom => mom.name === child.mother).born)
    ));

  averageAgeDiff = womenAges
    .reduce((accumulator, currentValue) =>
      accumulator + currentValue) / womenAges.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
