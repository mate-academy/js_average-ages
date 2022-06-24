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

const filterSex = (arr, male) => arr.filter((user) => user.sex === male);

function calculateMenAverageAge(people, century) {
  const men = filterSex(people, 'm').filter((person) =>
    century ? Math.ceil(person.died / 100) === century : true
  );

  const averageAge = men
    .reduce((sum, age) => sum + (age.died - age.born), 0) / men.length;

  return averageAge;
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
  const women = filterSex(people, 'f').filter((person) =>
    withChildren ? people.some((child) => child.mother === person.name) : true
  );

  const averageAge = women
    .reduce((sum, age) => sum + (age.died - age.born), 0) / women.length;

  return averageAge;
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
  const child = people.filter((children) =>
    onlyWithSon
      ? people.some((person) => children.mother === person.name)
      && children.sex === 'm'
      : people.some((person) => children.mother === person.name)
  );

  const averageAgeDiff = child
    .reduce((sum, children) =>
      sum + (children.born - people
        .find((mom) => children.mother === mom.name).born), 0
    ) / child.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
