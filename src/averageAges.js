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
  const men = century
    ? findSex(people, 'm').filter(
      person => Math.ceil(person.died / 100) === century
    )
    : findSex(people, 'm');

  return findAvgAge(men);
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
  const women = withChildren
    ? findSex(people, 'f').filter(
      personWomen => people.find(
        personAll => personAll.mother === personWomen.name
      )
    )
    : findSex(people, 'f');

  return findAvgAge(women);
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
  const children = people.filter(child => people.find(
    person => child.mother === person.name));

  const neededChildren = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  return neededChildren.reduce(
    (sum, child) => sum + (child.born - people.find(
      person => (
        person.name === child.mother)).born), 0) / neededChildren.length;
}

function findSex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function findAvgAge(people) {
  return people.reduce(
    (sum, person) => sum + (person.died - person.born), 0) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
