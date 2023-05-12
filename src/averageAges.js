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
  const men = people.filter((person) => century
    ? century === Math.ceil(person.died / 100) && person.sex === 'm'
    : person.sex === 'm');
  const menAges = men.map(person => person.died - person.born);

  return getAverage(menAges);
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
  const women = people.filter((person) => withChildren
    ? people.find(child => child.mother === person.name)
    : person.sex === 'f');
  const womenAges = women.map(person => person.died - person.born);

  return getAverage(womenAges);
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
  const children = people.filter((person) => onlyWithSon
    ? people.some(child => child.name === person.mother) && person.sex === 'm'
    : people.some(child => child.name === person.mother));
  const childrenDiff = children.map(child => {
    const motherOfChild = people.find(mother => mother.name === child.mother);

    return child.born - motherOfChild.born;
  });

  return getAverage(childrenDiff);
}

function getAverage(numbers) {
  return numbers
    ? numbers.reduce((a, b) => (a + b), 0) / numbers.length
    : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
