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
  const age = people
    .filter(person => {
      const manCentury = Math.ceil(person.died / 100);

      return century ? person.sex === 'm' && manCentury === century
        : person.sex === 'm';
    })
    .map(person => person.died - person.born);

  const result = age.reduce((sum, x) => sum + x, 0) / age.length;

  return result;
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
  const age = people
    .filter(person => {
      const hasChild = people.some(name => name.mother === person.name);

      return withChildren ? hasChild : person.sex === 'f';
    })
    .map(person => person.died - person.born);

  const result = age.reduce((sum, x) => sum + x, 0) / age.length;

  return result;
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
  const children = people.filter(person => onlyWithSon ? people
    .some(data => person.mother === data.name && person.sex === 'm')
    : people.some(data => person.mother === data.name));

  const age = children.map(child => {
    const findMother = people.find(mother => mother.name === child.mother);

    return child.born - findMother.born;
  });

  const result = age.reduce((sum, x) => sum + x, 0) / age.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
