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
  const men = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  return men.map(person => person.died - person.born)
    .reduce((sum, current) => sum + current) / men.length;
};

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
  const women = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => person.sex === 'f'
      && people.find(child => person.name === child.mother));

  return women.map(person => person.died - person.born)
    .reduce((sum, current) => sum + current) / women.length;
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
  const children = !onlyWithSon
    ? people.filter(child => child.mother)
    : people.filter(child => child.mother && child.sex === 'm');

  let quantity = children.length;

  const amount = children.reduce((previous, child) => {
    const mother = people.find(mom => child.mother === mom.name);

    if (!mother) {
      quantity--;

      return previous;
    }

    const sum = previous + (child.born - mother.born);

    return sum;
  }, 0);

  return amount / quantity;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
