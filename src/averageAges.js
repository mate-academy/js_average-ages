'use strict';

function calculateAverageAge(arr) {
  return Math.round((arr
    .reduce((sum, person) =>
      sum + (person.died - person.born), 0) / arr.length) * 100) / 100;
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
  const menAgeSum = people
    .filter(person =>
      century
        ? Math.ceil(person.died / 100) === century
        && person.sex === 'm'
        : person.sex === 'm'
    );

  return calculateAverageAge(menAgeSum);
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
  const womenAgeSum = people
    .filter(person =>
      withChildren
        ? people.some(child => child.mother === person.name)
        && person.sex === 'f'
        : person.sex === 'f'
    );

  return calculateAverageAge(womenAgeSum);
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
  let withMother = people
    .filter(child => child.mother !== null)
    .map(child => {
      const isMother = people.find(person => person.name === child.mother);

      if (isMother !== undefined) {
        return {
          ...child,
          wasBornAt: (child.born - isMother.born),
        };
      }
    })
    .filter(person => person !== undefined);

  if (onlyWithSon) {
    withMother = withMother.filter(person => person.sex === 'm');
  };

  const childCount = withMother.length;

  return Math.round((withMother
    .reduce((sum, person) => sum + person.wasBornAt, 0)
    / childCount) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
