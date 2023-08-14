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
  const males = people.filter((person) =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  const menAverageAge = males.reduce((acc, person) => (
    acc + person.died - person.born
  ), 0) / males.length;

  return menAverageAge;
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
  const females = people.filter((person) =>
    withChildren
      ? person.sex === 'f'
        && people.find((child) => person.name === child.mother)
      : person.sex === 'f');

  const womenAverageAge = females.reduce((acc, person) => (
    acc + person.died - person.born
  ), 0) / females.length;

  return womenAverageAge;
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
  const peopleWithMother = people.filter((person) =>
    onlyWithSon
      ? people.find((mother) => mother.name === person.mother)
        && person.sex === 'm'
      : people.find((mother) => mother.name === person.mother));

  const ageDifference = peopleWithMother.map((child) => {
    const mother = people.find((person) => child.mother === person.name);

    return child.born - mother.born;
  });

  const AvgAgeDifference = ageDifference.reduce((acc, age) => (
    acc + age
  ), 0) / ageDifference.length;

  return AvgAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
