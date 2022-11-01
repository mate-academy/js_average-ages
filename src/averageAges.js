'use strict';

function calculateAverageAge(arr) {
  return arr.reduce((sum, person) => (person.died - person.born) + sum, 0)
    / arr.length;
}

function getPersonBySex(people, sex) {
  return people.filter(person => person.sex === sex);
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
  const males = getPersonBySex(people, 'm');

  const filterArr = century
    ? males.filter(male => Math.ceil(male.died / 100) === century)
    : males;

  return calculateAverageAge(filterArr);
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
  const filterArr = people.filter((person) => {
    const fullName = person.name;

    const hasChildren = (human) => fullName === human.mother;

    return (withChildren)
      ? (getPersonBySex(people, 'f') && people.some(hasChildren))
      : (person.sex === 'f');
  });

  return calculateAverageAge(filterArr);
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
  const persons = people.filter(child => people.find(
    person => person.name === child.mother));

  const neededPersons = onlyWithSon
    ? getPersonBySex(persons, 'm')
    : persons;

  const ageDifference = neededPersons.reduce(
    (sum, child) => sum + child.born - people.find(
      person => person.name === child.mother).born, 0)
    / neededPersons.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
