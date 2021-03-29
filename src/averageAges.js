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
  let everageAge = century
    ? people.filter(person => person.sex === 'm')
      .filter(m => Math.ceil(m.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  everageAge = everageAge.map(m => m.died - m.born)
    .reduce((sum, age) => sum + age, 0) / everageAge.length;

  return everageAge;
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
  const women = people.filter(w => w.sex === 'f');
  const mothers = women.filter(person => people
    .some(w => w.mother === person.name));
  const averageWomen = (withChildren)
    ? mothers.map(mother => mother.died - mother.born)
      .reduce((sum, age) => sum + age, 0) / mothers.length
    : women.map(w => w.died - w.born)
      .reduce((sum, age) => sum + age, 0) / women.length;

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
  // write code here
  let children = people
    .filter(child => people
      .some(mother => child.mother === mother.name));

  children = (onlyWithSon)
    ? children.filter(child => child.sex === 'm')
    : children;

  const diffAges = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const everageDiff = diffAges.reduce((sum, age) => sum + age, 0);

  return everageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
