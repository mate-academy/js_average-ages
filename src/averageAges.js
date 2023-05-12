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
  const men = people.filter(century ? (person) =>
    century === Math.ceil(person.died / 100) && person.sex === 'm'
    : (person) => person.sex === 'm');
  const menAges = men.map(person => person.died - person.born);
  const agesSum = menAges.reduce((prev, person) => prev + person);

  return agesSum / menAges.length;
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
  const women = people.filter(withChildren ? (person) =>
    people.find(child => child.mother === person.name)
    : (person) => person.sex === 'f');
  const womenAges = women.map(person => person.died - person.born);
  const agesSum = womenAges.reduce((prev, person) => {
    const step = prev + person;

    return step;
  });

  return agesSum / womenAges.length;
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
  const children = people.filter(onlyWithSon ? (person) =>
    people.some(child => child.name === person.mother) && person.sex === 'm'
    : person => people.some(child => child.name === person.mother));
  const childrenDiff = children.map(child => {
    const motherOfChild = people.find(mother => mother.name === child.mother);

    return child.born - motherOfChild.born;
  });

  const sumAge = childrenDiff.reduce((prev, ageDiff) => {
    const step = prev + ageDiff;

    return step;
  });

  return sumAge / childrenDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
