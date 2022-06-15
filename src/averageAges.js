'use strict';

function getSex(array, sex) {
  return array.filter(person => person.sex === sex);
}

function getAverageAge(array) {
  const average = array.reduce((sum, person) => (
    sum + person.died - person.born
  ), 0);

  return average / array.length;
}

function getAllMother(people, women) {
  return people.find(person => person.mother === women.name);
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
  const AverageManAge = century
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;

  return getAverageAge(getSex(AverageManAge, 'm'));
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
  const women = getSex(people, 'f');

  const womenWithChild = withChildren
    ? women.filter(person => getAllMother(people, person))
    : women;

  return getAverageAge(womenWithChild);
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
  let kind = people
    .filter(child => people.some(mother => mother.name === child.mother));

  if (onlyWithSon) {
    kind = kind.filter(person => person.sex === 'm');
  }

  const result = kind
    .reduce((sum, child) => sum + child.born - people
      .find(parent => parent.name === child.mother).born, 0);

  return result / kind.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
