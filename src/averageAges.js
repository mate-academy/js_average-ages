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
function calculateMenAverageAge(people, century = 0) {
  const age = century !== 0
    ? people
      .filter((person) => Math.ceil(person.died / 100) === century)
      .filter((person) => person.sex === 'm')
      .map((person) => +`${person.died - person.born}`)
    : people
      .filter((person) => person.sex === 'm')
      .map((person) => +`${person.died - person.born}`);

  return +(age.reduce((all, now) => all + now) / age.length).toFixed(2);
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
  const women = people.filter((person) => person.sex === 'f');
  const withChidrenOrNo = withChildren
    ? women.filter((person) => people
      .find((human) => human.mother === person.name))
    : women;

  const age = withChidrenOrNo.map((person) => person.died - person.born);

  return +(age.reduce((all, now) => all + now) / age.length).toFixed(2);
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
  // 1. keep people who have mothers in the array
  // and Each person (or only for men)

  const children = people.filter((child) => people.find(mother => onlyWithSon
    ? mother.name === child.mother && child.sex === 'm'
    : mother.name === child.mother
  ));

  // 2. calculate the difference child.born - mother.born
  const ageDifference = children.map(function(person) {
    return person.born
    - people[people.findIndex((human) => human.name === person.mother)].born;
  });

  // 3. return the average value
  return +(ageDifference
    .reduce((all, now) => all + now) / ageDifference.length)
    .toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
