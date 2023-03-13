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
  const men = people.filter(({ sex, died }) => sex === 'm' && (
    century
      ? Math.ceil(died / 100) === century
      : true
  )
  );

  const averageAge = men.reduce(
    (sum, { died, born }) => sum + died - born, 0) / men.length;

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
function calculateWomenAverageAge(people, withChildren) {
  const female = people.filter(({ sex }) => sex === 'f');

  const withChild = withChildren
    ? female.filter(
      ({ name }) => people.some(({ mother }) => mother === name))
    : female;

  const averageAge = withChild.reduce(
    (sum, { died, born }) => sum + died - born, 0) / withChild.length;

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
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(person => person.sex === 'f').filter(
    ({ name }) => people.some(({ mother }) => mother === name));

  const children = people.filter(({ mother }) => mothers.some(
    ({ name }) => mother === name));

  const withSonOrNot = onlyWithSon
    ? children.filter(({ sex }) => sex === 'm')
    : children;

  const res = withSonOrNot.map(child => {
    const foundMom = mothers.find(mom => mom.name === child.mother);

    return foundMom ? child.born - foundMom.born : null;
  }).filter(val => val);

  const difference = res.reduce(
    (sum, item) => sum + item) / res.length;

  return difference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
