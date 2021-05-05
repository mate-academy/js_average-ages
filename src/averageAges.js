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
  const men = people.filter(person => person.sex === 'm');

  const menWithCentury = people.filter(person =>
    person.sex === 'm'
    && Math.ceil(person.died / 100) === century);

  const correctPersons = century ? menWithCentury : men;

  const result = correctPersons.map(person => person.died - person.born)
    .reduce((a, b) => (a + b));

  return +(result / correctPersons.length).toFixed(2);
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
  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = people.filter(person =>
    person.sex === 'f' && people.some(child => child.mother === person.name));

  const correctPersons = withChildren ? womenWithChildren : women;

  const result = correctPersons.map(person => person.died - person.born)
    .reduce((a, b) => (a + b));

  return +(result / correctPersons.length).toFixed(2);
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
  const children = people.filter(child =>
    people.find(mother => mother.name === child.mother));

  const sons = children.filter(child => child.sex === 'm');

  const correctPersons = onlyWithSon ? sons : children;

  const result = correctPersons.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born)
    .reduce((a, b) => (a + b));

  return +(result / correctPersons.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
