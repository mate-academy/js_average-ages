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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const masMan = century
    ? people.filter(
      (person) =>
        Math.ceil(person.died / 100) === century && person.sex === 'm'
    )
    : people.filter((person) => person.sex === 'm');

  return (
    masMan.reduce((sum, man) => sum + man.died - man.born, 0) / masMan.length
  );
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
  const masWomen = withChildren
    ? people.filter(
      (person) =>
        people.find((child) => child.mother === person.name) !== undefined
    )
    : people.filter((person) => person.sex === 'f');

  return (
    masWomen.reduce((sum, women) => sum + (women.died - women.born), 0)
    / masWomen.length
  );
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
  const masWomen = onlyWithSon
    ? people.filter(
      (child) =>
        people.find(
          (women) => child.mother === women.name && child.sex === 'm'
        ) !== undefined
    )
    : people.filter(
      (child) =>
        people.find((women) => child.mother === women.name) !== undefined
    );

  return (
    masWomen.reduce(
      (sum, child) =>
        sum
        + child.born
        - people.find((women) => child.mother === women.name).born,
      0
    ) / masWomen.length
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
