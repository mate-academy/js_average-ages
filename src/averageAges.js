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
  const men = people
    .filter(person => person.sex === 'm')
    .filter(person => !century || century === Math.ceil(person.died / 100))
    .map(person => person.died - person.born);

  return createAvarageAge(men);
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
  const mothersNames = people
    .filter(person => person.mother)
    .map(person => '' + person.mother);

  const women = people
    .filter(person => person.sex === 'f')
    .filter(person => !withChildren || mothersNames.includes(person.name))
    .map(person => person.died - person.born);

  return createAvarageAge(women);
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
  const children = people
    .filter(child => onlyWithSon
      ? people.find(person => child.mother === person.name && child.sex === 'm')
      : people.find(person => child.mother === person.name));

  const differenceAges = children
    .map(child =>
      (child.born - people.find(mother => mother.name === child.mother).born))
    .reduce((prev, curr) => prev + curr, 0);

  return differenceAges / children.length;
}

function createAvarageAge(people) {
  return people.reduce((a, b) => a + b) / people.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
