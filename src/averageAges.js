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
const age = function(person) {
  return person.died - person.born;
};

const getAverageAge = function(filteredArray) {
  return filteredArray.reduce((sum, person) => (
    sum + (age(person))), 0) / filteredArray.length;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const filtered = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  return getAverageAge(filtered);
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
  const woman = people.filter(person => person.sex === 'f');

  const filtered = withChildren
    ? woman.filter(
      person => people.some(peopleInfo => peopleInfo.mother === person.name
      ))
    : woman;

  return getAverageAge(filtered);
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
  const child = people.filter(peopleInfo => people.some(
    person => person.name === peopleInfo.mother
  ));

  const filtered = onlyWithSon
    ? child.filter(peopleInfo => peopleInfo.sex === 'm')
    : child;

  const findMother = (peopleInfo) => people.find(person =>
    person.name === peopleInfo.mother
  );

  return filtered.reduce((sum, peopleInfo) => (
    sum + peopleInfo.born - findMother(peopleInfo).born
  ), 0) / filtered.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
