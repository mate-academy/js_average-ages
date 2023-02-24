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
  const filteredMens = people.filter(person => (
    person.sex === 'm' && (!century || Math.ceil(person.died / 100) === century)
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
  const filteredWomens = people.filter(person => (
    person.sex === 'f' && (!withChildren || people.some(child => (
      child.mother === person.name)
    ))
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
  const children = people.filter(({ mother, sex }) => (
    findMums(people, mother) && (
      (!onlyWithSon || sex === 'm')
    )));

  const difference = children.reduce((acc, { born: childBorn, mother }) => (
    acc + childBorn - (
      findMums(people, mother).born
    )), 0);

  return difference / children.length;
}

function calculateAverageAge(peoples) {
  return peoples.reduce((sum, { died, born }) => (
    sum + (died - born)
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
