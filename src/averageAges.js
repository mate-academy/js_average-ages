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
  // filter Men, and set condition for century description
  const filterMen = people.filter(
    men => men.sex === 'm'
    && (!century || Math.floor((men.died / 100) + 1) === century));
  // count sum of ages ich men depend of century condition
  const sumAges = filterMen.reduce(
    (sum, man) => (sum + man.died - man.born), 0);

  return sumAges / filterMen.length;
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
  // filter Women, and set condition for children description
  const filterWomen = people.filter(
    women => women.sex === 'f'
    && (!withChildren || people.some(
      child => women.name === child.mother)));
  // count sum age for women depend from child description
  const sumAges = filterWomen.reduce(
    (sum, women) => (sum + women.died - women.born), 0);
  // count average age for our sum of ages and return it like result

  return sumAges / filterWomen.length;
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
  /* find all children wich have mothers from array and set
  condition for male sex of child(son) */
  const children = people.filter(
    person => people.some(mother => person.mother === mother.name)
    && (!onlyWithSon || person.sex === 'm'));
  /* cound difference between ages of mothers
   in time born of child and born of mother */
  const sumAges = children.map(
    child => (child.born - people.find(
      mother => child.mother === mother.name).born)).reduce(
    (sum, ageDiff) => (sum + ageDiff), 0);
  // count average age for our sum of ages and return it like result

  return sumAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
