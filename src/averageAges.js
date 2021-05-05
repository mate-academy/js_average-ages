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
  const agesInCentury = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  return agesInCentury.reduce((accumulator, man) =>
    accumulator + (man.died - man.born), 0) / agesInCentury.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter(person => (withChildren)
    ? person.sex === 'f'
    && people.some(child => child.mother === person.name)
    : person.sex === 'f',
  );

  return filteredWomen.reduce((accumulator, woman) =>
    accumulator + (woman.died - woman.born), 0) / filteredWomen.length;
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
    ? people.some(mother => child.mother === mother.name) && child.sex === 'm'
    : people.some(mother => child.mother === mother.name)
  );

  const ageDifference = children.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born
  );

  const averageAge = ageDifference.reduce((child, mother) =>
    (child + mother), 0) / ageDifference.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
