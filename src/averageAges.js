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
function calculateMenAverageAge(people, century = null) {
  const men = century
    ? people.filter(person => person.sex
      === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const totalAge = men.reduce((sum, person) => sum
  + (person.died - person.born), 0);
  const averageAge = men.length ? totalAge / men.length : 0;

  return averageAge;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
function calculateWomenAverageAge(people, withChildren = false) {
  const women = withChildren
    ? people.filter(person => person.sex
      === 'f' && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const totalAge = women.reduce((sum, person) => sum
  + (person.died - person.born), 0);
  const averageAge = women.length ? totalAge / women.length : 0;

  return averageAge;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const children = people.filter(person => {
    return onlyWithSon
      ? people.find(child => child.name === person.mother) && person.sex === 'm'
      : people.find(child => child.name === person.mother);
  });

  children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    child.ageDifference = child.born - mother.born;

    return child.ageDifference;
  });

  const differenceSum = children.reduce((sum, child) => {
    return sum + child.ageDifference;
  }, 0);

  const averageAgeDifference = differenceSum / children.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
