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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  return men.map(person => person.died - person.born)
    .reduce((sumAges, currentAge) => sumAges + currentAge) / men.length;
};

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
  const women = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => person.sex === 'f'
    && people.find(child => person.name === child.mother));

  return women.map(person => person.died - person.born)
    .reduce((sumAges, currentAge) => sumAges + currentAge) / women.length;
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
  const children = !onlyWithSon
    ? people.filter(child => child.mother)
    : people.filter(child => child.mother && child.sex === 'm');

  let numberOfChilder = children.length;
  const sumOfAges = children.reduce((sum, child) => {
    const mother = people.find(mom => child.mother === mom.name);

    if (!mother) {
      numberOfChilder--;

      return sum;
    }

    return sum + (child.born - mother.born);
  }, 0);

  return sumOfAges / numberOfChilder;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
