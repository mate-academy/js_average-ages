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
  const men = people.filter(person => person.sex === 'm');

  const menWithCentury = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  return menWithCentury.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0) / menWithCentury.length;
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
  // write code here
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = withChildren
    ? women.filter(person => people.some(one => one.mother === person.name))
    : women;

  return womenWithChildren.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0) / womenWithChildren.length;
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
  // write code here
  const child = people.filter(person => {
    return people.some(one => one.name === person.mother);
  });

  const childSon = onlyWithSon
    ? child.filter(person => person.sex === 'm')
    : child;

  return childSon.reduce((sum, { mother, born }) => {
    return sum + born - people.find(person => person.name === mother).born;
  }, 0) / childSon.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
