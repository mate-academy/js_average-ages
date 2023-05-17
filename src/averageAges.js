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
  const men = people.filter(person => person.sex === 'm');

  const menCondition = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  const summaryAges = menCondition
    .map(person => person.died - person.born)
    .reduce((sum, element) => sum + element);

  return summaryAges / menCondition.length;
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
  const women = people.filter(person => person.sex === 'f');

  const womenCondition = withChildren
    ? women.filter(person => people.some(child => child.mother === person.name))
    : women;

  const summaryAges = womenCondition
    .map(person => person.died - person.born)
    .reduce((sum, element) => sum + element);

  return summaryAges / womenCondition.length;
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
  const mothers = people
    .filter(person => people.some(child => child.mother === person.name));

  const childrenCondition = onlyWithSon
    ? people.filter(son => son.sex === 'm')
    : people;

  const children = childrenCondition
    .filter(child => mothers.some(mother => child.mother === mother.name));

  const difference = children
    .map(child => {
      const currentMother = mothers
        .find(mother => mother.name === child.mother);

      return child.born - currentMother.born;
    })
    .reduce((sum, el) => sum + el);

  return difference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
