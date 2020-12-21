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
  const filteredArr = people.filter(
    person => (century !== undefined)
      ? (Math.ceil(person.died / 100) === century && person.sex === 'm')
      : person.sex === 'm'
  );

  return filteredArr.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  ) / filteredArr.length;
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
  const filteredArr = people.filter(
    person => (!withChildren)
      ? person.sex === 'f'
      : people.some(x => x.mother === person.name)
  );

  return filteredArr.reduce(
    (sum, x) => sum + (x.died - x.born), 0
  ) / filteredArr.length;
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
  const children = people.filter(child => (onlyWithSon)
    ? people.some(mother => mother.name === child.mother && child.sex === 'm')
    : people.some(mother => mother.name === child.mother)
  );

  const birthAges = children.map(
    child => child.born - people.find(
      mother => mother.name === child.mother
    ).born
  );

  return birthAges.reduce((average, age) => average + age, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
