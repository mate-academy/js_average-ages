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
  const men = people.filter(male =>
    male.sex === 'm'
    && (century > 0 ? Math.ceil(male.died / 100) === century : true)
  );

  return men
    .reduce((count, male) => count + (male.died - male.born), 0)
    / men.length;
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
  const women = people.filter((woman) => (
    woman.sex === 'f'
    && (
      withChildren
        ? people.some(person => woman.name === person.mother)
        : true
    )
  ));

  return women
    .reduce((count, woman) =>
      count + (woman.died - woman.born), 0)
    / women.length;
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
  const mothers = people.filter((woman) => (
    woman.sex === 'f'
    && people.some(person => woman.name === person.mother)
  ));

  const childs = people.filter(person => (
    mothers.some(woman =>
      person.mother === woman.name)
      && (onlyWithSon ? person.sex === 'm'
        : true
      )
  ));

  const result = childs
    .reduce((count, child) =>
      count + (child.born - mothers.find(mother =>
        child.mother === mother.name).born), 0)
    / childs.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
