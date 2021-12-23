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
  const mansArray = (century)
    ? people.filter(man => man.sex === 'm'
      && century === Math.ceil(man.died / 100))
    : people.filter(man => man.sex === 'm');

  return mansArray.reduce((sum, mansaAge) =>
    sum + (mansaAge.died - mansaAge.born), 0) / mansArray.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const womensArray = (withChildren)
    ? people.filter(women => people.find(children =>
      children.mother === women.name) && women.sex === 'f')
    : people.filter(women => women.sex === 'f');

  return womensArray.reduce((sum, womensAge) =>
    sum + (womensAge.died - womensAge.born), 0) / womensArray.length;
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
  const arrayOfDiff = (onlyWithSon)
    ? people.filter(child => child.sex === 'm'
      && people.find(mother => mother.name === child.mother))
    : people.filter(child => people.find(mother =>
      mother.name === child.mother));

  return arrayOfDiff.reduce((sum, child) => sum + (child.born
    - people.find(mother => mother.name === child.mother).born), 0)
    / arrayOfDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
