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
// - Here is some crazy solutions
// |-- to solve it with no loops, if\else statements etc
// |-- ...but a lot of variables))
function averager(people) {
  const agesOnly = people.map((person) => person.died - person.born);

  return agesOnly.reduce((prev, curr) => prev + curr, 0) / agesOnly.length;
}

function calculateMenAverageAge(people, century = true) {
  const men = people.filter(person => person.sex === 'm');
  const centuryAges = men
    .filter((person) =>
      Math.ceil(person.died / 100) === century || century === true);

  return averager(centuryAges);
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
  const female = people.filter(person => person.sex === 'f');
  const women = withChildren
    ? female.filter(person => people.find(
      child => child.mother === person.name))
    : female;

  return averager(women);
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
 * a. 12 - 14 \ m: name(b)
 * b. 10 - 15 ;
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let children = people.filter(child => child.mother
    && people.find(person => person.name === child.mother));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  return children.reduce((prev, curr) =>
    prev + curr.born - people.find(person =>
      person.name === curr.mother).born, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
