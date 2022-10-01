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
  const men = (arguments.length === 2)
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return men.reduce((previousValue, current) => (
    previousValue + current.died - current.born
  ), 0) / men.length;
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
  const women = (arguments.length === 2)
    ? people.filter(person => person.sex === 'f'
      && people.some(element => element.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return women.reduce((previousValue, current) => (
    previousValue + current.died - current.born
  ), 0) / women.length;
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
  const children = (arguments.length === 2)
    ? people.filter(child => child.sex === 'm'
      && people.some(mother => mother.name === child.mother))
    : people.filter(child => people.some(
      mother => mother.name === child.mother));

  const mothersAge = children.map(child => ({
    mothersAgeAtBorn: child.born
      - people.find(person => person.name === child.mother).born,
  }));

  return mothersAge.reduce((previousValue, difference) => (
    previousValue + difference.mothersAgeAtBorn
  ), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
