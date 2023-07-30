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
function calculateMenAverageAge(people, century = false) {
  const menInCentury = people.filter(({ sex, died }) => sex === 'm'
    && (century === false || Math.ceil(died / 100) === century));

  return menInCentury.reduce((sum, { died, born }) => sum + died - born, 0)
  / menInCentury.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const womenWitchChildren = people.filter(({ sex, name }) => sex === 'f'
  && (!withChildren || people.findIndex(({ mother }) => mother === name) > -1));

  return womenWitchChildren.reduce((a, { died, born }) => a + died - born, 0)
  / womenWitchChildren.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const childsDiff = people.filter(({ sex, mother }) => mother != null
    && people.filter(({ name }) => name === mother).length > 0
    && (onlyWithSon === false || sex === 'm')).map(person => {
    const mother = people.filter(({ name }) => name === person.mother)[0];

    return person.born - mother.born;
  });

  return childsDiff.reduce((sum, value) => sum + value) / childsDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
