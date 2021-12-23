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
  const men = people.filter((el) => century
    ? el.sex === 'm' && Math.ceil(el.died / 100) === century : el.sex === 'm');

  const len = men.length;
  const ages = men.map(a => a.died - a.born);

  const result = ages.reduce((a, b) => a + b) / len;

  return result;
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
  const women = people.filter(el => withChildren
    ? people.some(parent => el.name === parent.mother)
    && (el.sex === 'f') : el.sex === 'f');

  const len = women.length;
  const ages = women.map(a => a.died - a.born);
  const result = (ages.reduce((a, b) => a + b) / len);

  return Math.round(result * 100) / 100;
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
  const women = people.filter(el =>
    people.some(parent => el.name === parent.mother)
    && el.sex === 'f');

  const child = people.filter(el => onlyWithSon
    ? people.some(children => el.mother === children.name && el.sex === 'm')
    : people.some(children => el.mother === children.name));

  const diff = child.map(children =>
    children.born - women.find(parent => children.mother === parent.name).born);

  const len = diff.length;

  const result = (diff.reduce((a, b) => a + b) / len);

  return Math.round(result * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
