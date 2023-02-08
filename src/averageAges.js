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
function getAverageAge(people) {
  return people
    .map(person => person.died - person.born)
    .reduce((sum, age) => sum + age) / people.length;
}

function calculateMenAverageAge(people, century) {
  const filterMale = people.filter(person => person.sex === 'm');

  const filteredPeople = century
    ? filterMale.filter(person => Math.ceil(person.died / 100) === century)
    : filterMale;

  return getAverageAge(filteredPeople);
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
  const filterFemale = people.filter(person => person.sex === 'f');

  const filteredPeople = withChildren
    ? filterFemale.filter(person =>
      people.some(child => child.mother === person.name))
    : filterFemale;

  return getAverageAge(filteredPeople);
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
  const findMotherOf = (child) =>
    people.find(mother => mother.name === child.mother);

  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm' && person.mother
      && findMotherOf(person))
    : people.filter(person => person.mother && findMotherOf(person));

  return filteredPeople
    .map(person => person.born - findMotherOf(person).born)
    .reduce((sum, diff) => sum + diff) / filteredPeople.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
