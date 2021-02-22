'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(
    person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return men
    .reduce((sum, year) => (sum
    + (year.died - year.born) / men.length), 0);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(
    person => withChildren
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f'
  );

  return women
    .reduce((sum, year) => (sum
    + (year.died - year.born) / women.length), 0);
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
  // write code here
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
