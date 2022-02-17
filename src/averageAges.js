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
    century
      ? person => person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person => person.sex === 'm'
  );

  const sumMenAge = men.reduce((prev, person) =>
    prev + (person.died - person.born), 0);

  return sumMenAge / men.length;
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
  const women = people.filter(
    withChildren
      ? (person, index, persons) =>
        (persons.some(child => child.mother === person.name))
      : person => person.sex === 'f');

  const sumWomenAge = women.reduce((prev, person) =>
    prev + (person.died - person.born), 0);

  return sumWomenAge / women.length;
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
  const personWithSon = people.filter(child =>
    onlyWithSon
      ? people.find(person => person.name === child.mother
          && child.sex === 'm')
      : people.find(person => person.name === child.mother));

  const ageDifference = personWithSon.map(
    child => child.born - people.find(person =>
      person.name === child.mother).born);

  const averageAgeDifference = ageDifference.reduce((prev, age) =>
    prev + age, 0) / ageDifference.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
