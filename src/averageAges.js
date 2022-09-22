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
  const males = [...people].filter(person => (
    century
      ? (Math.ceil(person.died / 100) === century && person.sex === 'm')
      : (person.sex === 'm')
  ));

  return Math.round(males.map(man => man.died - man.born)
    .reduce((man1, man2) => man1 + man2) / males.length * 100) / 100;
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
  const women = [...people].filter(person => (
    withChildren
      ? (people.some(child => child.mother === person.name)
        && person.sex === 'f')
      : (person.sex === 'f')
  ));

  return Math.round(women.map(woman => woman.died - woman.born)
    .reduce((woman1, woman2) => woman1 + woman2) / women.length * 100) / 100;
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
  const children = [...people].filter(person => (
    onlyWithSon
      ? (people.some(woman => woman.name === person.mother)
        && person.sex === 'm')
      : people.some(woman => woman.name === person.mother)
  ));

  return Math.round(children
    .map(child => child.born - people.find(person =>
      person.name === child.mother).born)
    .reduce((diff1, diff2) => diff1 + diff2) / children.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
