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
  const onlyMen = [...people].filter(x =>
    century ? x.sex === 'm' && Math.ceil(x.died / 100) === century
      : x.sex === 'm');

  const menAges = [...onlyMen].map(x => x.died - x.born);

  const result = (menAges.reduce((a, b) => a + b) / onlyMen.length).toFixed(2);

  return Math.ceil(result * 100) / 100;
}
// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const hasChildren = [...people].map(x => x.mother);

  const onlyWomen = [...people].filter(x =>
    withChildren ? x.sex === 'f' && hasChildren.includes(x.name)
      : x.sex === 'f');

  const womenAges = [...onlyWomen].map(x =>
    x.died - x.born);
  const result = (womenAges.reduce((a, b) =>
    a + b) / onlyWomen.length).toFixed(2);

  return Math.ceil(result * 100) / 100;
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
  const children = people.filter(child => onlyWithSon ? people.some(mother =>
    mother.name === child.mother) && child.sex === 'm' : people.some(mother =>
    mother.name === child.mother));

  const averageAge = children.reduce((prev, child) => {
    const mothers = people.find(mother => mother.name === child.mother);

    return prev + (child.born - mothers.born);
  }, 0);

  return averageAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
