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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const menAges = men.reduce((prev, person) =>
    prev + (person.died - person.born), 0);

  return menAges / men.length;
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
  // write code here

  const women = people.filter(
    mothers => withChildren
      ? mothers.sex === 'f'
      && people.some(person => person.mother === mothers.name)
      : mothers.sex === 'f'
  );

  const womanAges = women.reduce((prev, person) =>
    prev + (person.died - person.born), 0);

  return womanAges / women.length;
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

  const children = people.filter(person => onlyWithSon
    ? people.some(mom => person.mother === mom.name)
      && (person.sex === 'm')
    : people.some(mom => person.mother === mom.name)
  );

  const yearsDifference = children.map(person =>
    person.born - people.find(mom =>
      mom.name === person.mother).born);

  const yearsDifferenceSum = yearsDifference.reduce((prev, year) =>
    year + prev, 0);

  return yearsDifferenceSum / yearsDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
