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
function findAverageAge(obj) {
  return +(obj
    .reduce((sum, person) => sum + person.died - person.born, 0) / obj.length);
}

function calculateMenAverageAge(people, century) {
  const filteredObj = people
    .filter(person => century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm');

  return findAverageAge(filteredObj);
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
  const filteredObj = people
    .filter(person => withChildren
      ? people.find(kid => kid.mother === person.name) && person.sex === 'f'
      : person.sex === 'f');

  return findAverageAge(filteredObj);
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
  const filteredObj = onlyWithSon
    ? people.filter(kid => kid.sex === 'm'
      && people.find(mom => mom.name === kid.mother))
    : people.filter(kid => people.find(mom => mom.name === kid.mother));

  const averageAgeDiff = filteredObj
    .reduce((sum, person) => sum + person.born - people
      .find(mom => mom.name === person.mother).born, 0) / filteredObj.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
