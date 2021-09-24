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
  const agesOfMen = (century === undefined)
    ? people
      .filter(person => person.sex === 'm')
      .map(person => person.died - person.born)
    : people
      .filter(person => person.sex === 'm')
      .filter((person) => Math.ceil(person.died / 100) === century)
      .map(person => person.died - person.born);

  return (agesOfMen.reduce((a, b) => a + b) / agesOfMen.length)
    .toFixed(2) * 1;
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
  const agesOfWomen = (!withChildren)
    ? people
      .filter(person => person.sex === 'f')
      .map(person => person.died - person.born)
    : people
      .filter(person => person.sex === 'f'
        && people.some(woman => woman.mother === person.name))
      .map(person => person.died - person.born);

  return (agesOfWomen.reduce((a, b) => a + b) / agesOfWomen.length)
    .toFixed(2) * 1;
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
  let result = 0;
  const children = (onlyWithSon)
    ? people
      .filter(child => people
        .some(woman => child.mother === woman.name
          && child.sex === 'm'))
    : people
      .filter(child => people
        .some(woman => child.mother === woman.name));

  const motherAges = children.map(child => child.born
    - (people.find(mother => child.mother === mother.name)).born);

  result = (motherAges.reduce((a, b) => a + b)
    / children.length).toFixed(2) * 1;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
