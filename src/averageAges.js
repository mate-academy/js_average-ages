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

  const menArr = people.filter(item => {
    const calculateCentery = Math.ceil(item.died / 100);

    return century
      ? item.sex === 'm' && calculateCentery === century
      : item.sex === 'm';
  })
    .map(item => item.died - item.born);

  return menArr.reduce((ageSum, man) =>
    ageSum + man, 0) / menArr.length;
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

  const femaleArr = people.filter(item => {
    const withChild = people.some(name => name.mother === item.name);

    return withChildren ? withChild : item.sex === 'f';
  })
    .map(item => item.died - item.born);

  return femaleArr.reduce((ageSum, woman) =>
    ageSum + woman, 0) / femaleArr.length;
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

  const children = people.filter(item => onlyWithSon ? people
    .some(data => item.mother === data.name && item.sex === 'm')
    : people.some(data => item.mother === data.name));

  const ageChild = children.map(item => {
    const childMother = people.find(mother => mother.name === item.mother);

    return item.born - childMother.born;
  });

  return ageChild.reduce((ageSum, child) =>
    ageSum + child, 0) / ageChild.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
