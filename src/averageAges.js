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
  const manArray = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return averageAge(manArray);
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
function averageAge(people) {
  const sumOfAges = people.reduce((sum, { born, died }) =>
    sum + (died - born), 0);

  return sumOfAges / people.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const womenArray = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(child => person.name === child.mother))
    : people.filter(person => person.sex === 'f');

  return averageAge(womenArray);
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
  const childrenArray = onlyWithSon
    ? people.filter(child =>
      (people.find(mother => child.mother === mother.name)
      && child.sex === 'm'))
    : people.filter(child =>
      (people.find(mother => child.mother === mother.name)));

  const ageDiff = childrenArray.reduce((sum, child) => {
    return sum + child.born - people.find(mother => (
      child.mother === mother.name)).born;
  }, 0) / childrenArray.length;

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
