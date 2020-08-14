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
  const menAgeArr = people
    .filter(
      man => century
        ? man.sex === 'm' && Math.ceil(man.died / 100) === century
        : man.sex === 'm'
    )
    .map(man => man.died - man.born);

  return menAgeArr.reduce((sum, item) => sum + item, 0) / menAgeArr.length;
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
  const womenAgeArr = people
    .filter(women => withChildren
      ? people.some(person => person.mother === women.name)
      : women.sex === 'f'
    )
    .map(woman => woman.died - woman.born);

  return womenAgeArr.reduce((sum, item) => sum + item, 0) / womenAgeArr.length;
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
  const diffAgeArr = people
    .filter(
      person => onlyWithSon
        ? people.some(women => women.name === person.mother)
          && person.sex === 'm'
        : people.some(women => women.name === person.mother)
    )
    .map(
      person => person.born - people.find(
        woman => woman.name === person.mother
      ).born
    );

  return diffAgeArr
    .reduce((sum, item) => sum + item, 0) / diffAgeArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
