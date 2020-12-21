'use strict';

/**
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function centuryFilter(mens, century) {
  return century
    ? mens.filter(men => Math.ceil(men.died / 100) === century)
    : mens;
}

function calculateMenAverageAge(people, century) {
  let mens = people.filter(human => human.sex === 'm');

  mens = centuryFilter(mens, century);

  const sumY = mens.reduce((sum, men) => sum + (men.died - men.born), 0);

  return sumY / mens.length;
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
function childFilter(withChildren, womens, mothers) {
  return withChildren === undefined
    ? womens
    : womens.filter(woman => mothers.includes(woman.name));
}

function calculateWomenAverageAge(people, withChildren) {
  let womens = people.filter(human => human.sex === 'f');
  const mothers = people.map(human => human.mother);

  womens = childFilter(withChildren, womens, mothers);

  const sumY
    = womens.reduce((sum, woman) => sum + (woman.died - woman.born), 0);

  return sumY / womens.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
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
  const children = people.filter(child => onlyWithSon
    ? people.some(mother => mother.name === child.mother) && child.sex === 'm'
    : people.some(mother => mother.name === child.mother));

  const ageDifferences = children
    .map(child => child.born - people
      .find(mother => child.mother === mother.name).born);

  return ageDifferences
    .reduce((acc, current) => acc + current) / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
