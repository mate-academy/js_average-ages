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
  const men = (century === undefined)
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && century === Math.ceil(person.died / 100));

  const totalAge = men.reduce((sum, item) =>
    sum + item.died - item.born, 0);

  return totalAge / men.length;
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
  const women = (!withChildren)
    ? people.filter(person => person.sex === 'f')
    : people.filter(person =>
      person.sex === 'f' && people.some(child =>
        child.mother === person.name)
    );

  const totalAge = women.reduce((sum, item) =>
    sum + item.died - item.born, 0);

  return totalAge / women.length;
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
  const women = people.filter(woman =>
    woman.sex === 'f'
      && people.some(child =>
        child.mother === woman.name));

  const children = (!onlyWithSon)
    ? people.filter(child =>
      women.some(woman =>
        woman.name === child.mother))
    : people.filter(child =>
      women.some(woman =>
        woman.name === child.mother && child.sex === 'm'));

  const diff = children.map(child =>
    child.born - women.find(woman => child.mother === woman.name).born);

  const totalDiff = diff.reduce((sum, item) =>
    sum + item, 0
  );

  return Math.round((totalDiff / children.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
