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
  const men = people.filter(man => (
    century
      ? man.sex === 'm' && Math.ceil(man.died / 100) === century
      : man.sex === 'm'
  ));

  return findAverageAge(men);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  const women = people.filter(woman => (
    withChildren
      ? woman.sex === 'f' && hasChildren(people, woman.name)
      : woman.sex === 'f'
  ));

  return findAverageAge(women);
}

function hasChildren(people, name, sex = false) {
  return people.some(person => (
    sex
      ? person.sex === sex && person.mother === name
      : person.mother === name
  ));
}

function findAverageAge(people) {
  const ages = people.map(person => person.died - person.born);
  const sumOfAll = ages.reduce((sum, age) => sum + age, 0);

  return sumOfAll / people.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const children = people.filter(person => (
    onlyWithSon
      ? person.sex === 'm' && checkIfMotherExists(people, person.mother)
      : checkIfMotherExists(people, person.mother)
  ));

  const ageDiffrences = children.map(child => (
    child.born - getMotherBorn(people, child.mother)
  ));

  const averageDiff = ageDiffrences.reduce((sum, age) => sum + age, 0);

  return averageDiff / ageDiffrences.length;
}

function checkIfMotherExists(people, motherName) {
  return people.some(person => person.name === motherName);
}

function getMotherBorn(people, motherName) {
  const mother = people.find(person => person.name === motherName);

  return mother.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
