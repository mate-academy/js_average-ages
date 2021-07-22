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
  const men = people.filter((man) => century > 0
    ? ((Math.ceil(man.died / 100) === century)
&& man.sex === 'm') : (man.sex === 'm'));

  const average = men.reduce((a, b) => (a + (b.died - b.born)), 0) / men.length;

  return average;
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
  const women = people.filter((woman) => withChildren === true
    ? ((people.find((child) => child.mother === woman.name)
    && woman.sex === 'f')) : (woman.sex === 'f'));

  const averageWomen = women.reduce((a, b) =>
    (a + (b.died - b.born)), 0) / women.length;

  return averageWomen;
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
  const womenWithChild = people.filter((woman) =>
    onlyWithSon ? ((people.find((child) =>
      child.mother === woman.name && child.sex === 'm')))
      : ((people.find((child) => child.mother === woman.name))));
  const childs = people.filter((child) => onlyWithSon ? ((people.find((woman) =>
    child.mother === woman.name && child.sex === 'm')))
    : (people.find((woman) => child.mother === woman.name)));
  const averageWomen = childs.reduce((a, b) =>
    (a + (b.born - (womenWithChild.find((woman) =>
      woman.name === b.mother)).born)), 0) / childs.length;

  return averageWomen;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
