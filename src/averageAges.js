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
  const filteredMen = (!century)
    ? people.filter(person => person.sex === 'm')
    : people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century);

  return getAverage(filteredMen, 'died', 'born');
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
  const filteredWomen = (!withChildren)
    ? people.filter(gender => gender.sex === 'f')
    : people.filter(mother => mother.sex === 'f'
    && (people.some(person => mother.name === person.mother)));

  return getAverage(filteredWomen, 'died', 'born');
}

function getAverage(people, value1, value2) {
  const averageAge = people
    .reduce((sum, { [value1]: diedYear, [value2]: bornYear }) => (
      sum + (diedYear - bornYear)
    ), 0);

  return people.length && averageAge / people.length;
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
  const difference = (!onlyWithSon)
    ? people.filter(child =>
      people.some(mother => child.mother === mother.name))
    : people.filter(child =>
      people.some(mother => child.mother === mother.name) && child.sex === 'm');

  const averageAgeDiff = difference.reduce((total, child) => {
    const motherBorn = people.find(mother => child.mother === mother.name).born;

    return (total + (child.born - motherBorn));
  }, 0) / difference.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
