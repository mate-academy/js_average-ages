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
  const men = people.filter((person) =>
    century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm');
  const menAges = men.map((person) => person.died - person.born);
  const sumOfMenAges = menAges.reduce((a, b) => a + b);

  return sumOfMenAges / menAges.length;
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
  const women = people.filter(
    withChildren
      ? mother => people.find(child => child.mother === mother.name)
      : person => person.sex === 'f');
  const womenAges = women.map((person) => person.died - person.born);
  const sumOfWomenAges = womenAges.reduce((a, b) => a + b);

  return sumOfWomenAges / womenAges.length;
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
  const womanWithChild = people.filter(child =>
    onlyWithSon
      ? people
        .find(person => person.name === child.mother && child.sex === 'm')
      : people
        .find(person => person.name === child.mother));

  const ageDiff = womanWithChild.map(child =>
    child.born - people.find(person => person.name === child.mother).born);

  return ageDiff.reduce((prevAge, nextAge) =>
    prevAge + nextAge) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
