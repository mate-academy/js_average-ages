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
  const filteredMen = people.filter(
    century
      ? person => person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person => person.sex === 'm'
  );

  return filteredMen.reduce((start, person) =>
    start + (person.died - person.born), 0) / filteredMen.length;
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
  const filteredWomen = people.filter(
    withChildren
      ? (person, index, persons) =>
        (persons.some(child => child.mother === person.name))
      : person => person.sex === 'f');

  return filteredWomen.reduce((start, person) =>
    start + (person.died - person.born), 0) / filteredWomen.length;
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
  const filteredOnlyWithSon = people.filter(child =>
    onlyWithSon
      ? people.find(person => person.name === child.mother
          && child.sex === 'm')
      : people.find(person => person.name === child.mother));

  const peopleAges = filteredOnlyWithSon.map(
    child => child.born - people.find(person =>
      person.name === child.mother).born);

  return peopleAges.reduce((start, age) =>
    start + age, 0) / peopleAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
