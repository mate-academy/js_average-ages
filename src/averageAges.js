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
  const arrayOfMan = (century)
    ? people.filter(man => man.sex === 'm'
      && Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');

  return arrayOfMan.reduce((sum, man) => (sum + (man.died - man.born)), 0)
    / arrayOfMan.length;
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
  const arrayOfWomen = (withChildren)
    ? people.filter(women => people.some(child => child.mother === women.name)
      && women.sex === 'f')
    : people.filter(women => women.sex === 'f');

  return arrayOfWomen.reduce((sum, women) =>
    sum + women.died - women.born, 0) / arrayOfWomen.length;
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
  const arrayChild = (onlyWithSon)
    ? people.filter(child => child.sex === 'm'
      && people.some(mother => child.mother === mother.name))
    : people.filter(child => people.some(mother =>
      child.mother === mother.name));

  return arrayChild.reduce((sum, child) => sum + (child.born
    - people.find(mother => child.mother === mother.name).born), 0)
    / arrayChild.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
