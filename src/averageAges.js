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
  let averageAge = 0;
  let diedMen;

  century
    ? diedMen = people.filter(person => person.sex === 'm'
       && Math.ceil(person.died / 100) === century)
    : diedMen = people.filter(person => person.sex === 'm');

  averageAge = diedMen.reduce((sum, man) =>
    sum + man.died - man.born, 0) / diedMen.length;

  return averageAge;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let averageWomanAge = 0;
  let diedWomen;

  withChildren
    ? diedWomen = people.filter(person => person.sex === 'f'
        && people.filter(child => child.mother === person.name).length > 0)
    : diedWomen = people.filter(person => person.sex === 'f');

  averageWomanAge = diedWomen.reduce((sum, woman) =>
    sum + woman.died - woman.born, 0) / diedWomen.length;

  return averageWomanAge;
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
  const gapInAge = [];

  const women = people.filter(person =>
    person.sex === 'f'
    && people.filter(child => child.mother === person.name));

  const children = people.filter(person =>
    people.filter(child => child.mother === person.name));

  const sons = people.filter(person =>
    person.sex === 'm'
    && people.filter(son => son.mother === person.name));

  onlyWithSon
    ? women.map(woman => sons.map(son => (
      son.mother === woman.name
        ? gapInAge.push(son.born - woman.born)
        : gapInAge
    )))
    : women.map(woman => children.map(child => (
      child.mother === woman.name
        ? gapInAge.push(child.born - woman.born)
        : gapInAge
    )));

  return gapInAge.reduce((sum, gap) => sum + gap, 0) / gapInAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
