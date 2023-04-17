'use strict';

function calculateAverageAge(people) {
  const totalAge = people
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  return totalAge / people.length;
}

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
  const man = people.filter(person => person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century));

  return calculateAverageAge(man);
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
  const woman = people.filter(person => withChildren
    ? people.find(child => person.name === child.mother)
    : person.sex === 'f');

  return calculateAverageAge(woman);
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
  const women = people.filter(person => person.sex === 'f');

  const children = people.filter(person =>
    women.some(mother => mother.name === person.mother));

  const filteredChildren = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDifference = filteredChildren.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  const averageAge = ageDifference.reduce((sum, age) =>
    sum + age) / ageDifference.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
