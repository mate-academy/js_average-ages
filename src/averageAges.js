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

function calcAverageAge(people) {
  return people
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const filterMen = people.filter(men =>
    (!century || century === Math.ceil(men.died / 100))
    && men.sex === 'm');

  return calcAverageAge(filterMen);
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
  const filterWomen = people.filter(women =>
    withChildren
      ? people.find(child => women.name === child.mother)
      : women.sex === 'f');

  return calcAverageAge(filterWomen);
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
  const children = people.filter(child =>
    onlyWithSon
      ? people.find(mother => mother.name === child.mother)
         && child.sex === 'm'
      : people.find(mother => mother.name === child.mother)
  );

  const calculateAge = children.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  const averageAge = calculateAge.reduce((sum, age) =>
    sum + age) / calculateAge.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
