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
function calculateMenAverageAge(people, century = true) {
  const men = people.filter(person => person.sex === 'm');
  const ages = men
    .map((person) =>
      Math.ceil(person.died / 100) === century || century === true
        ? person.died - person.born
        : 0)
    .filter(age => age !== 0);

  return ages.reduce((prev, curr) => prev + curr) / ages.length;
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
  const mothers = [...new Set(people
    .filter(person => person.mother !== null)
    .map((person) => person.mother))];
  const women = withChildren
    ? female.filter(person => mothers.includes(person.name))
    : female;
  const ages = women
    .map((person) => person.died - person.born)
    .filter(age => age !== 0);

  return ages.reduce((prev, curr) => prev + curr) / ages.length;
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
