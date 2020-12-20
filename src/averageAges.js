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

  const result = century
    ? men.filter(person => Math.ceil(person['died'] / 100) === century)
    : men;

  return +(result
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / result.length)
    .toFixed(2,
    );
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

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
  const women = people
    .filter(person => person.sex === 'f')
    .map(person => person.died - person.born);
  const womenWithChildren = people
    .filter(mother => people.some(child => child.mother === mother.name));

  const result = withChildren
    ? womenWithChildren.map(mother => mother.died - mother.born)
    : women;

  return +(result
    .reduce((a, b) => a + b) / result.length)
    .toFixed(2);
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
  const children = people
    .filter(child => people.some(mother => mother.name === child.mother));
  const sons = children.filter(son => son.sex === 'm');

  const result = onlyWithSon
    ? +(sons
      .map(child => child.born - people
        .find(mother => mother.name === child.mother).born)
      .reduce((a, b) => a + b) / sons.length)
      .toFixed(2)
    : +(children
      .map(child => child.born - people
        .find(mother => mother.name === child.mother).born)
      .reduce((a, b) => a + b) / children.length).toFixed(2);

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
