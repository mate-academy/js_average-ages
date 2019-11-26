'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns a
 * function calculates
 *
 * To calculate century:
 * Divide year of person's de
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people
    .filter(person => person.sex === 'm'
      && (century ? Math.ceil(person.died / 100) === century : true));

  return getAverage(men);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people
    .filter(woman => woman.sex === 'f'
      && (withChildren ? people
        .some(person => woman.name === person.mother) : true));

  return getAverage(women);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDiference = people
    .filter(child => onlyWithSon ? child.sex === 'm' : true)
    .map(child => {
      const isMother = people.find(mother => mother.name === child.mother);

      return isMother ? child.born - isMother.born : undefined;
    })
    .filter(differ => differ);

  return ageDiference
    .reduce((sum, ageDiff) => sum + ageDiff, 0)
    / ageDiference.length;
}

function getPersonAge(individual) {
  return individual
    .reduce((sum, person) => sum + (person.died - person.born), 0);
}

function getAverage(array) {
  return getPersonAge(array) / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
