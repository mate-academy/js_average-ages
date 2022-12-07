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
  const men = people.filter(
    man =>
      century
        ? man.sex === 'm' && Math.ceil(man.died / 100) === century
        : man.sex === 'm'

  );
  const averageAge = men.map(age => age.died - age.born)
    .reduce((sum, age) => sum + age);

  return calculateAverage(averageAge, men.length);
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
  const women = people.filter(person => (
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  ));
  const averageAge = women.map(age => age.died - age.born)
    .reduce((sum, age) => sum + age);

  return calculateAverage(averageAge, women.length);
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
  const children = people.filter(person => (
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
      && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  ));
  const calculateAge = children.map(person =>
    (person.born - people.find(mother => mother.name === person.mother).born))
    .reduce((sum, age) => sum + age);

  return calculateAverage(calculateAge, children.length);
}

function calculateAverage(age, length) {
  return +(age / length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
