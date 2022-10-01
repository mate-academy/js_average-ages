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
  const filteredMen = people.filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  const averageAge = calculateAverageAge(filteredMen);

  return parseFloat(averageAge.toFixed(2));
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
  const filteredWoman = people.filter(person => (
    withChildren
      ? person.sex === 'f' && people.some(some => some.mother === person.name)
      : person.sex === 'f'
  ));

  const averageAge = calculateAverageAge(filteredWoman);

  return parseFloat(averageAge.toFixed(2));
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
  let children = people.filter(child => child.mother
    && people.find(person => person.name === child.mother));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const withSon = children.reduce((prev, curr) =>
    prev + curr.born - people.find(person =>
      person.name === curr.mother).born, 0) / children.length;

  return withSon;
}

function calculateAverageAge(data) {
  const averageAge = data.reduce((sum, x) => sum + (x.died - x.born), 0);

  return averageAge / data.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
