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
  const men = people.filter(person => person.sex === 'm');

  return (arguments.length === 1)
    ? round(getAverageAge(men), 2)
    : round(getAverageAge(filterByCentury(men, century)), 2);
}

function filterByCentury(people, century) {
  return people
    .filter(person => Math.ceil(person.died / 100) === century);
}

function round(number, roundTo) {
  return Math.round(number * (10 ** roundTo)) / (10 ** roundTo);
}

function getAverageAge(people) {
  return people.reduce((acc, person) => (
    acc + (person.died - person.born)
  ), 0) / people.length;
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
  return withChildren
    ? round(getAverageAge(people.filter(person => (
      person.sex === 'f' && people.some(child => child.mother === person.name)
    ))), 2)
    : round(getAverageAge(people.filter(person => person.sex === 'f')), 2);
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
  const childs = people.filter(child => {
    return onlyWithSon
      ? child.sex === 'm' && people.some(mother => mother.name === child.mother)
      : people.some(mother => mother.name === child.mother);
  });

  const sumDiffAge = childs.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0);

  return round(sumDiffAge / childs.length, 2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
