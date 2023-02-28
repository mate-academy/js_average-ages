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
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  /* const age = men.map(person => (person.died - person.born)); */

  /* function getAverageAge (people) {
    return age.reduce((sum, x) => sum + x, 0) / people.length;
  } */

  /* const averageAge = agesSum / men.length; */

  return getAverageAge(men);
  // write code here
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
  const women = people.filter(person =>
    withChildren ? person.sex === 'f'
    && people.some(child => child.mother === person.name)
      : person.sex === 'f');

  /* const age = women.map(person => (person.died - person.born));

  const agesSum = age.reduce((sum, x) =>
    sum + x, 0);

  const averageAge = agesSum / women.length; */

  return getAverageAge(women);
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
  const children = onlyWithSon
    ? people.filter(person => people.find(
      mother => person.mother === mother.name
    ) && person.sex === 'm')

    : people.filter(person => people.find(
      mother => person.mother === mother.name
    ));

  const ageDifference = children.map(
    child => child.born - people.find(mother =>
      child.mother === mother.name).born
  );

  const averegeAgeDifference = ageDifference.reduce((acc, person) =>
    acc + person) / ageDifference.length;

  return averegeAgeDifference;
}

function getAverageAge(people) {
  return people.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
