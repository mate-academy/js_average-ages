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

function getAverageAge(people) {
  return people.map((person) => person.died - person.born)
    .reduce((a, b) => a + b, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const forMen = people
    .filter(person => person.sex === 'm'
      && (!century
        || century === Math.ceil(person.died / 100)));

  return getAverageAge(forMen);
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
  const mothers = people
    .map(person => person.mother)
    .filter(name => name !== null);

  const forWomen = people
    .filter((person) => person.sex === 'f'
    && (!withChildren
      || mothers.includes(person.name)));

  return getAverageAge(forWomen);
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
  const forChildren = people.filter((child) => onlyWithSon
    ? people.find(
      (person) => child.mother === person.name && child.sex === 'm'
    )
    : people.find((person) => child.mother === person.name)
  );

  const differenceInAge = forChildren
    .map(
      (child) =>
        child.born - people.find((mother) => mother.name === child.mother).born
    );

  const result = differenceInAge.reduce((a, b) => a + b, 0)
      / differenceInAge.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
