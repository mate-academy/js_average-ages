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
  let totalMen;

  century
    ? totalMen = people.filter(
      (person) => century === Math.ceil(person.died / 100) && person.sex === 'm'
    )
    : totalMen = people.filter((person) => person.sex === 'm');

  const averageAge = totalMen.map(person => person.died - person.born);
  const age = averageAge.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue
  ) / averageAge.length;

  return age;
}
// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
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
  let totalWomen;

  withChildren
    ? totalWomen = people.filter(
      (person) => people.find(mother => mother.mother === person.name)
    )
    : totalWomen = people.filter((person) => person.sex === 'f');

  const averageAge = totalWomen.map(person => person.died - person.born);
  const age = averageAge.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue
  ) / averageAge.length;

  return age;
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
  let children;

  onlyWithSon
    ? children = people.filter(
      person => people.some(
        child => child.name === person.mother) && person.sex === 'm'
    )
    : children = people.filter(
      person => people.some(child => child.name === person.mother)
    );

  const averageAge = children.map(
    person => (person.born - people.find(
      el => el.name === person.mother).born)
  );
  const age = averageAge.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue
  ) / averageAge.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
