'use strict';

function getAverage(humans) {
  return humans
    .map(human => human.died - human.born)
    .reduce((sum, currentAge) => sum + currentAge) / humans.length;
}

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
  const men = !century
    ? people.filter(man => man.sex === 'm')

    : people.filter(man => (
      man.sex === 'm' && Math.ceil(man.died / 100) === century
    ));

  return getAverage(men);
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
  const women = !withChildren
    ? people.filter(woman => woman.sex === 'f')

    : people.filter(woman => people.some(child => child.mother === woman.name));

  return getAverage(women);
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
  const mothers = people
    .filter(mother => people.some(child => child.mother === mother.name));

  const children = !onlyWithSon
    ? people.filter(child => people
      .some(mother => mother.name === child.mother))

    : people.filter(child => (
      people.some(mother => mother.name === child.mother) && child.sex === 'm'
    ));

  return children
    .map(child => child.born - mothers
      .find(motherBorn => motherBorn.name === child.mother).born)
    .reduce((sum, currentAge) => sum + currentAge) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
