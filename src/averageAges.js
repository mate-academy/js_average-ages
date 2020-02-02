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
    .filter(person => person.sex === 'm'
    && ((century) ? Math.ceil(person.died / 100) === century : true));

  const sumOfAgeMen = men.reduce((sum, man) => sum + man.died - man.born, 0);

  return sumOfAgeMen / men.length;
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

  const sumOfAgeWomen = women
    .reduce((sum, woman) => sum + woman.died - woman.born, 0);

  return sumOfAgeWomen / women.length;
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
  const ageDifference = people
    .filter(kid => onlyWithSon ? kid.sex === 'm' : true)
    .map(kid => {
      const mother = people.find(mom => mom.name === kid.mother);

      return mother ? kid.born - mother.born : undefined;
    })
    .filter(ageDiff => ageDiff);

  const sumOfAgeDifference = ageDifference.reduce((sum, diff) => sum + diff, 0);

  return sumOfAgeDifference / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
