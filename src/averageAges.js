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
  const isFilteredMen = people.filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm')
  );
  const menAverageAge = isFilteredMen.reduce((summ = 0, { born, died }) =>
    summ + (died - born), 0) / isFilteredMen.length;

  return menAverageAge;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  function IsMother(all, mother) {
    return all.some(child => child.mother === mother.name);
  }

  const isFilteredWomen = people.filter(person => (
    withChildren
      ? person.sex === 'f' && IsMother(people, person)
      : person.sex === 'f')
  );
  const womenAverageAge = isFilteredWomen.reduce((summ = 0, { born, died }) =>
    summ + (died - born), 0) / isFilteredWomen.length;

  return womenAverageAge;
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
  function hasMother(all, child) {
    return all.some(mother => child.mother === mother.name);
  }

  function findMother(all, mother) {
    return all.find(person => person.name === mother);
  }

  const isFilteredFamily = people.filter(person => (
    onlyWithSon
      ? person.sex === 'm' && hasMother(people, person)
      : hasMother(people, person))
  );
  const familyAverageAge
  = isFilteredFamily.reduce((summ = 0, person) =>
    summ + (person.born - findMother(people, person.mother).born), 0)
    / isFilteredFamily.length;

  return familyAverageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
