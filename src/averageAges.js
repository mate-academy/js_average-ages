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

  return men.reduce((previous, current) => {
    return previous + (current.died - current.born);
  }, 0) / men.length;
}
/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : person.sex === 'f'
  );

  return women.reduce((previous, current) => {
    return previous + (current.died - current.born);
  }, 0) / women.length;
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
  const differenceInAge = [];

  const women = people.filter(person =>
    person.sex === 'f'
      && people.filter(child => child.mother === person.name));

  const children = people.filter(person =>
    people.filter(child => child.mother === person.name));

  const sons = people.filter(person =>
    person.sex === 'm'
      && people.filter(son => son.mother === person.name));

  if (onlyWithSon) {
    women.forEach(woman => sons.forEach(son => (
      son.mother === woman.name
        ? differenceInAge.push(son.born - woman.born)
        : differenceInAge
    )));
  } else {
    women.forEach(woman => children.forEach(child => (
      child.mother === woman.name
        ? differenceInAge.push(child.born - woman.born)
        : differenceInAge
    )));
  }

  return differenceInAge
    .reduce((sum, diff) => sum + diff, 0) / differenceInAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
