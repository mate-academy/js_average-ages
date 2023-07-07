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
  const men = people.filter(person => person.sex === 'm');
  const menDiedInCentury = century
    ? men.filter((man) => century === Math.ceil(man.died / 100))
    : men;
  const ageOfMenDiedInCentury = menDiedInCentury
    .map(({ born, died }) => died - born);
  const averageAge = findAverage(ageOfMenDiedInCentury);

  return averageAge;
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
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = withChildren
    ? women.filter(woman => people
      .some(person => person.mother === woman.name)) : women;
  const ageOfWomen = womenWithChildren.map(({ born, died }) => died - born);

  const averageAge = findAverage(ageOfWomen);

  return averageAge;
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
  const peopleWithMothers = people
    .filter(person => people.some(parent => parent.name === person.mother));
  const childrenByGenderWithMothers = onlyWithSon
    ? peopleWithMothers.filter(person => person.sex === 'm')
    : peopleWithMothers;
  const diffWithMothersAge = childrenByGenderWithMothers
    .map(child => child.born
    - (people.find(parent => parent.name === child.mother)).born);
  const averageAgeDiff = findAverage(diffWithMothersAge);

  return averageAgeDiff;
}

function findAverage(arr) {
  return arr
    .reduce((previousValue, current) => previousValue + current, 0)
    / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
