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
  return !century
    ? people.filter(person => person.sex === 'm')
      .map(person => person.died - person.born)
      .reduce(calcAverage)
    : people.filter(person =>
      Math.ceil(person.died / 100) === century && person.sex === 'm')
      .map(person => person.died - person.born)
      .reduce(calcAverage);
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
  return !withChildren
    ? people.filter(person => person.sex === 'f')
      .map(person => person.died - person.born)
      .reduce(calcAverage)
    : people.filter(person =>
      person.sex === 'f' && people.some(child => child.mother === person.name))
      .map(person => person.died - person.born)
      .reduce(calcAverage);
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
  return !onlyWithSon
    ? people.filter(child =>
      people.some(mother => child.mother === mother.name))
      .map(child =>
        child.born - people.find(mother => child.mother === mother.name).born)
      .reduce(calcAverage)
    : people.filter(child =>
      people.some(mother => child.mother === mother.name && child.sex === 'm'))
      .map(child =>
        child.born - people.find(mother => child.mother === mother.name).born)
      .reduce(calcAverage);
}

const calcAverage = (sum, nextElement, index) => {
  return sum + +((nextElement - sum) / (index + 1)).toFixed(4);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
