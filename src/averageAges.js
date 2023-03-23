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
  const menAges = (century)
    ? people
      .filter(person => Math.ceil(person.died / 100) === century
        && person.sex === 'm')
    : people
      .filter(person => person.sex === 'm');

  return menAges
    .map(person => person.died - person.born)
    .reduce((age, sum) => sum + age, 0) / menAges.length;
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
  const mothers = people.map(person => person.mother);

  const womenAges = (withChildren)
    ? people
      .filter(person => mothers.includes(person.name) && person.sex === 'f')
    : people
      .filter(person => person.sex === 'f');

  return womenAges
    .map(person => person.died - person.born)
    .reduce((age, sum) => sum + age, 0) / womenAges.length;
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
  const children = (onlyWithSon)
    ? people
      .filter(child => people.some(woman => woman.name === child.mother
        && child.sex === 'm'))
    : people
      .filter(child => people.some(woman => woman.name === child.mother));

  const diffAges = children.reduce((sum, child) => {
    const mom = people.find(mother => mother.name === child.mother);
    const ageDiff = child.born - mom.born;

    return sum + ageDiff;
  }, 0);

  return diffAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
