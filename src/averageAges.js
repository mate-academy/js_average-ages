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
const sumAgeDifference = (sum, x) => sum + (x.died - x.born);
const calculateAverageAge
= (peopleArray) => peopleArray.reduce(sumAgeDifference, 0) / peopleArray.length;
const isMan = (p) => p.sex === 'm';
const isWoman = (p) => p.sex === 'f';

function calculateMenAverageAge(people, century) {
  const menArray = people.filter((p) => (century !== undefined)
    ? (isMan(p) && (century === Math.ceil(p.died / 100)))
    : (isMan(p)));

  return calculateAverageAge(menArray);
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
  const womenArray = people.filter((p) => (withChildren !== undefined)
    ? (isWoman(p) && people.some(isMother => p.name === isMother.mother))
    : (isWoman(p)));

  return calculateAverageAge(womenArray);
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
  const isChild
  = (p) => people.some(haveMother => p.mother === haveMother.name);
  const childrenArray = onlyWithSon
    ? people.filter((p) =>
      (isChild(p) && isMan(p)))
    : people.filter((p) =>
      (isChild(p)));

  return childrenArray.reduce((sum, child) => {
    const mother = people.find(({ name }) => name === child.mother);

    return sum + child.born - mother.born;
  }, 0) / childrenArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
