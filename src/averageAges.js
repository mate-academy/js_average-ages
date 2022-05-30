'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of human's death by 100: Math.ceil(human.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const ifCentury = century ? people.filter(
    human => Math.ceil(human.died / 100) === century && human.sex === 'm')
    : people.filter(human => human.sex === 'm');

  return ifCentury
    .map(human => human.died - human.born)
    .reduce((sumOfAges, age) => sumOfAges + age, 0) / ifCentury.length;
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
  const ifChild = withChildren ? people.filter(
    human => people.find(mother => human.name === mother.mother)
    && human.sex === 'f') : people.filter(human => human.sex === 'f');

  return ifChild
    .map(woman => woman.died - woman.born)
    .reduce((sumOfAges, age) => sumOfAges + age, 0) / ifChild.length;
};

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
  const children = onlyWithSon ? people.filter(human => human.sex === 'm'
  && people.some(mother => mother.name === human.mother))
    : people.filter(human => (
      people.some(mother => mother.name === human.mother)));

  const difference = children.map(child => (
    child.born - people.find(mother => mother.name === child.mother).born));

  return difference.reduce((sumOfAges, age) => (
    sumOfAges + age), 0) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
