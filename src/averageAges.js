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
  const men = people.filter(person => (century)
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const menAges = Number((men.reduce((sum, man) =>
    (sum + (man.died - man.born)), 0) / men.length).toFixed(2));

  return menAges;
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
  const women = people.filter(person => (withChildren)
    ? person.sex === 'f' && people.some(child => child.mother === person.name)
    : person.sex === 'f');

  const womenAges = Number((women.reduce((sum, woman) =>
    (sum + (woman.died - woman.born)), 0) / women.length).toFixed(2));

  return womenAges;
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
  const moms = people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name));

  const momsNames = moms.map(mom => mom.name);

  const children = people.filter(person => (onlyWithSon)
    ? person.sex === 'm' && momsNames.includes(person.mother)
    : momsNames.includes(person.mother));

  const ageDiff = Number((children.reduce((sum, child) =>
    (sum + (child.born - (moms.find(mom =>
      mom.name === child.mother)).born)), 0)
      / children.length).toFixed(2));

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
