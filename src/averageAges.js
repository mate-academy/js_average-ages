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

function getAge(array) {
  return array.reduce((sum, elem) => sum + elem.died - elem.born, 0);
}

function getAverage(array) {
  return getAge(array) / array.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(elem => elem.sex === 'm'
    && (century ? Math.ceil(elem.died / 100) === century : true));

  return getAverage(men);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  // write code here
  const women = people.filter(woman => woman.sex === 'f'
    && (withChildren ? people.find(child => woman.name === child.mother) : true));

  return getAverage(women);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
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
  // write code here
  const mothers = people.filter(woman => woman.sex === 'f'
    && people.some(person => woman.name === person.mother));

  const children = people.filter(person => (onlyWithSon ? person.sex === 'm' : person)
    && mothers.some(mom => person.mother === mom.name));

  const diffAge = children.map(child => mothers.map(mom => {
    return child.mother === mom.name ? child.born - mom.born : null;
  }).filter(item => item !== null));

  return diffAge.reduce((sum, elem) => sum + elem[0], 0) / diffAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
