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
  const menArray = !century
    ? people.filter(man => man.sex === 'm')
    : people.filter(man => man.sex === 'm'
      && century === Math.ceil(man.died / 100));

  const age = menArray.map(man => man.died - man.born);

  return age.reduce((a, b) => a + b) / age.length;
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
  const womenArr = !withChildren
    ? people.filter(woman => woman.sex === 'f')
    : people.filter(woman =>
      people.some(child => child.mother === woman.name));

  const age = womenArr.map(woman => woman.died - woman.born);

  return age.reduce((a, b) => a + b) / age.length;
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
  const childrenArr = !onlyWithSon
    ? people.filter(kid => people.find(mother => mother.name === kid.mother))
    : people.filter(kid => kid.sex === 'm'
      && people.find(mother => mother.name === kid.mother));

  const ageDiff = childrenArr.map(child => child.born
    - people.find(mother => mother.name === child.mother).born);

  return ageDiff.reduce((a, b) => a + b) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
