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
  const men = people.filter(person => century
    ? century === Math.ceil(person.died / 100) && person.sex === 'm'
    : person.sex === 'm');

  const sumOfYears = men.reduce((amount, { born, died }) => {
    const livedYears = died - born;

    return amount + livedYears;
  }, 0);

  return sumOfYears / men.length;
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
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(child => child.mother === person.name)
    : person.sex === 'f');

  const sumOfYears = women.reduce((amount, { born, died }) => {
    const livedYears = died - born;

    return amount + livedYears;
  }, 0);

  return sumOfYears / women.length;
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
  const children = people.filter(child => onlyWithSon
    ? people.find(woman => woman.name === child.mother) && child.sex === 'm'
    : people.find(woman => woman.name === child.mother));

  const ageDiff = children.map(child =>
    child.born - people.find(woman => woman.name === child.mother).born);

  return ageDiff.reduce((sum, current) => sum + current, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
