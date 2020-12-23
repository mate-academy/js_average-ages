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
  let men;

  (arguments.length > 1)
    ? men = people.filter(man => man.sex === 'm'
      && Math.ceil(man.died / 100) === century)
    : men = people.filter(man => man.sex === 'm');

  const menAge = men.map(man => man.died - man.born);

  const menAverageAge = menAge.reduce((a, b) => a + b, 0)
  / menAge.length;

  return +menAverageAge.toFixed(2);
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
  let womans;

  (withChildren)
    ? womans = people.filter(woman => woman.sex === 'f'
      && people.some(child => child.mother === woman.name))
    : womans = people.filter(woman => woman.sex === 'f');

  const womansAge = womans.map(woman => woman.died - woman.born);

  const womanAverageAge = womansAge.reduce((a, b) => a + b, 0)
  / womansAge.length;

  return +womanAverageAge.toFixed(2);
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
  let children;

  (onlyWithSon)
    ? children = people.filter(child => child.sex === 'm'
    && people.some(mother => child.mother === mother.name))
    : children = people.filter(child =>
      people.some(mother => child.mother === mother.name));

  const ageDiffrences = children.map(child => child.born
    - people.find(mother => mother.name === child.mother).born);

  return ageDiffrences.reduce((sum, age) => sum + age, 0)
    / ageDiffrences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
