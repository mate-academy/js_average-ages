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

function returnAvarageAge(person) {
  const avarageAge
    = person.reduce((current, sum) => current + (sum.died - sum.born), 0)
    / person.length;

  return +avarageAge.toFixed(2);
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  return returnAvarageAge(men);
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
  const women = people.filter(person => (
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  ));

  return returnAvarageAge(women);
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
  const children = people.filter(child => (
    onlyWithSon
      ? child.mother
        && people.find(person => person.name === child.mother)
        && child.sex === 'm'
      : child.mother && people.find(person => person.name === child.mother)
  ));

  const ageDifferences = children.map(child => {
    const mother = people.find(women => women.name === child.mother);

    return child.born - mother.born;
  });

  const avarageResult
  = ageDifferences.reduce((curr, sum) => curr + sum, 0) / ageDifferences.length;

  return +avarageResult.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
