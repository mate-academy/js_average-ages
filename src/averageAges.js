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
  const mens = whatTheSex(people, 'm');
  const filteredMens = mens.filter(men => (century
    ? Math.ceil(men.died / 100) === century
    : men
  ));

  return calculateAverageAge(filteredMens);
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
  const womens = whatTheSex(people, 'f');
  const filteredWomens = womens.filter(women => (withChildren
    ? people.some(child => child.mother === women.name)
    : women
  ));

  return calculateAverageAge(filteredWomens);
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
  const childrens = people.filter(child => findMums(people, child.mother) && (
    onlyWithSon
      ? child.sex === 'm'
      : child
  ));

  return (childrens.reduce((sum, child) => sum + child.born - (
    findMums(people, child.mother).born
  ), 0)) / childrens.length;
}

function whatTheSex(peoples, letter) {
  return peoples.filter(person => person.sex === letter);
}

function calculateAverageAge(peoples) {
  return peoples.reduce((sum, person) => (
    sum + (person.died - person.born)
  ), 0) / peoples.length;
}

function findMums(peoples, childMother) {
  return peoples.find(person => person.name === childMother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
