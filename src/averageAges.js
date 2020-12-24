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
  const men = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  const menAge = men.map(person => person.died - person.born);

  const result = menAge.reduce((x, y) => x + y) / menAge.length;

  return result;
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
  const womenFilter = withChildren
    ? woman => woman.sex === 'f'
      && people.some(person => person.mother === woman.name)
    : woman => woman.sex === 'f';

  const women = people.filter(womenFilter);

  const womenAge = women.map(person => person.died - person.born);

  const result = womenAge.reduce((x, y) => x + y) / womenAge.length;

  return result;
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
  const women = people.filter(woman => woman.sex === 'f'
    && people.some(person => person.mother === woman.name));

  const childrenFilter = onlyWithSon
    ? person => person.sex === 'm'
      && women.find(woman => person.mother === woman.name)
    : person => women.find(woman => person.mother === woman.name);

  const children = people.filter(childrenFilter);

  const ageDifference = children.map(child =>
    child.born - women.find(mother => mother.name === child.mother).born);

  return ageDifference.reduce((a, b) => a + b) / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
