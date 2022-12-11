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

  const manArray = century ? people.filter(item => {
    return Math.ceil(item.died / 100) === century && item.sex === 'm';
  }) : people.filter(item => item.sex === 'm');

  return manArray.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / manArray.length;
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
  const mothers = people.map((x) => x.mother);

  const womanArr = withChildren ? people.filter(item => {
    return item.sex === 'f' && mothers.includes(item.name);
  }) : people.filter(item => item.sex === 'f');

  return womanArr.reduce((a, b) => {
    return a + (b.died - b.born);
  }, 0) / womanArr.length;
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
  const childrens = people.filter(
    person => people.find(mother => mother.name === person.mother));
  const children = onlyWithSon ? childrens.filter((child) => child.sex === 'm')
    : childrens;

  const difference = children.map(child => {
    return child.born - people.find(mother =>
      mother.name === child.mother).born;
  });

  return difference.reduce((a, b) => {
    return (a + b);
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
