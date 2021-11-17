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
  const qwe = century
    ? people.filter(a => a.sex === 'm')
      .filter(a => Math.ceil(a.died / 100) === century)
    : people.filter(a => a.sex === 'm');

  return qwe.reduce((prev, item) =>
    (prev + (item.died - item.born) / qwe.length), 0);
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
  const qwe = withChildren
    ? people.filter((item, index, array) =>
      (array.some(itemChild => itemChild.mother === item.name)))
    : people.filter(a => a.sex === 'f');

  return qwe.reduce((prev, item) =>
    (prev + (item.died - item.born) / qwe.length), 0);
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
  const sorted = people.filter(child =>
    onlyWithSon
      ? people.find(person => person.name === child.mother
        && child.sex === 'm')
      : people.find(person => person.name === child.mother));

  const arrOfAges = sorted.map(
    child => child.born - people.find(
      person => person.name === child.mother).born);

  return arrOfAges.reduce((a, b) => a + b, 0) / arrOfAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
