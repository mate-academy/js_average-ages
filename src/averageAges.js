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
  const men = people.filter(person => {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  const ageAv = men.reduce((sum, a) => sum + (a.died - a.born), 0);

  return ageAv / men.length;
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
  const women = people.filter(person => {
    return withChildren
      ? person.sex === 'f'
        && people.some(child => child.mother === person.name)
      : person.sex === 'f';
  });

  const ageAv = women.reduce((sum, a) => sum + (a.died - a.born), 0);

  return +(ageAv / women.length).toFixed(2);
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
  const children = people.filter(person => {
    return onlyWithSon
      ? person.sex === 'm'
        && people.some(mother => person.mother === mother.name)
      : people.some(mother => person.mother === mother.name);
  });

  const moms = people.filter(person => {
    return people.some(child => child.mother === person.name);
  });

  const diffAge = children.map(child => {
    return child.born - moms.find(mother => child.mother === mother.name).born;
  });

  return diffAge.reduce((a, b) => a + b, 0) / diffAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
