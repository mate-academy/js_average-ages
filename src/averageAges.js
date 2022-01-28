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
  const filterMen = people.filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  const menAverageAge = filterMen.reduce((acc, { born, died }) =>
    acc + (died - born), 0) / filterMen.length;

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
  const isWomen = person => (person.sex === 'f');

  const isWomenWithChildren = person => (isWomen(person)
    && people.some(child => child.mother === person.name));

  const filterWomen = people.filter(
    withChildren
      ? isWomenWithChildren
      : isWomen);

  const womenAverageAge = filterWomen.reduce((acc, { born, died }) =>
    acc + (died - born), 0)
    / filterWomen.length;

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
  const filterMother = people.filter(child => (
    onlyWithSon
      ? child.sex === 'm' && people.some(mother => child.mother === mother.name)
      : people.some(mother => child.mother === mother.name)));

  const array = filterMother.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born);

  const averageAgeDiff = array.reduce((prev, val) => prev + val) / array.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
