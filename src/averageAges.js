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
 *
 *
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? Math.ceil(person.died / 100) === century
    && person.sex === 'm'
    : person.sex === 'm');

  const ages = men.map(elem => elem.died - elem.born);

  const sumAges = ages.reduce((a, b) => a + b, 0);

  const average = sumAges / men.length;

  return average;
}

/**
 * If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? people.some(element => person.sex === 'f'
    && person.name === element.mother)
    : person.sex === 'f');

  const ages = women.map(elem => elem.died - elem.born)
  
  const sumAges = ages.reduce((a, b) => a + b, 0);

  const average = sumAges / women.length;

  return average;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age (difference between a child
 * and his mother in the array). (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothersExist = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.find(element =>
      person.mother === element.name)
    : people.find(element => person.mother === element.name));

  const differences = mothersExist.map(child => child.born
    - people.find(element => element.name === child.mother).born);

  const agesSum = differences.reduce((a, b) => a + b);
  const average = agesSum / mothersExist.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
