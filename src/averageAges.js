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
function result(people) {
  const age = people.map(el => el.died - el.born);

  const sum = age.reduce((x, y) => x + y, 0) / age.length;

  return sum;
}

function calculateMenAverageAge(people, century = true) {
  const men = people.filter(el => el.sex === 'm');

  const res = men
    .filter(el => Math.ceil(el / 100) === century || century === true);

  return result(res);
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
  const women = people.filter(el => el.sex === 'f');

  const res = withChildren
    ? women.filter(person => people.find(
      child => child.mother === person.name))
    : women;

  return result(res);
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
  let children = people.filter(child => (
    child.mother && people.find(woman => woman.name === child.mother)
  ));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  return children.reduce((prev, curr) => (
    prev + curr.born - people.find(woman => (
      woman.name === curr.mother
    )).born), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
