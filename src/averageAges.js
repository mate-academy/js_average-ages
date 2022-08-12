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
  const manArray = people
    .filter(person => century === undefined
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century);

  return manArray.map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / manArray.length;
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
  const womenArray = people
    .filter(person => withChildren === undefined
      ? person.sex === 'f'
      : person.sex === 'f' && people.find(mothers =>
        mothers.mother === person.name) !== undefined);

  return womenArray.map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / womenArray.length;
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
  const childrenArray = people
    .filter(child => onlyWithSon === undefined
      ? people.find(mother => child.mother === mother.name) !== undefined
      : people.find(mother =>
        child.mother === mother.name && child.sex === 'm')
      !== undefined);

  return childrenArray.map(child => {
    const elemObj = people.find(mother => child.mother === mother.name);

    return child.born - elemObj.born;
  }).reduce((a, b) => a + b, 0) / childrenArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
