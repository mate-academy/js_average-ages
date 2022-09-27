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
  const men = people.filter(person => !century
    ? person.sex === 'm'
    : Math.ceil(person.died / 100) === century && person.sex === 'm'
  );

  return findAverageAge(men);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = people.filter(person => !withChildren
    ? person.sex === 'f'
    : person.sex === 'f' && people.find(child => (
      child.mother === person.name
    )));

  return findAverageAge(women);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const children = people.filter(child => !onlyWithSon
    ? child.mother && people.find(person => person.name === child.mother)
    : child.mother && people.find(person => person.name === child.mother)
    && child.sex === 'm');

  const sumOfAge = children.reduce((sum, child) => {
    const mother = people.find(
      person => person.name === child.mother);

    return sum + child.born - mother.born;
  }, 0);

  return sumOfAge / children.length;
}

function findAverageAge(people) {
  const averageAge = people.reduce((sum, age) => (
    sum + (age.died - age.born)
  ), 0);

  return averageAge / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
