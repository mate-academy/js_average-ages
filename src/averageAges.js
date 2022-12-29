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
  const men = century === undefined
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  const averageAge = men.map(person => +person.died - +person.born)
    .reduce((a, b) => a + b)
    / men.length;

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
  const mothers = people.map(person => person.mother);

  const women = withChildren === undefined
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => (
      person.sex === 'f' && mothers.includes(person.name)
    ));

  const averageAge = women.map(person => person.died - person.born)
    .reduce((a, b) => a + b)
    / women.length;

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
  const children = onlyWithSon === undefined
    ? [...people]
    : people.filter(child => child.sex === 'm');

  let ageDifference = children.map(child => getAgeDifference(child));

  function getAgeDifference(child) {
    const mother = people.find(person => person.name === child.mother);

    return mother && child.born - mother.born;
  }

  ageDifference = ageDifference.filter(el => el);

  const averageAgeDifference = ageDifference.reduce((a, b) => a + b)
    / ageDifference.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
