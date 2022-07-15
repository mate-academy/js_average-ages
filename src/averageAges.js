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
  const men = people.filter(({ sex, died }) => (century
    ? sex === 'm' && century === Math.ceil(died / 100)
    : sex === 'm'
  ));

  const ages = men.reduce((prev, { died, born }) => (
    prev + (died - born)
  ), 0);

  return ages / men.length;
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
  const mothers = people.filter(({ sex, name }) => (withChildren
    ? sex === 'f'
      && people.some(child => child.mother === name)
    : sex === 'f'
  ));

  const ages = mothers.reduce((prev, { died, born }) => (
    prev + (died - born)
  ), 0);

  return ages / mothers.length;
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
  const children = people.filter(({ sex, mother }) => (onlyWithSon
    ? people.some(woman => (mother === woman.name)
      && sex === 'm')
    : people.some(woman => mother === woman.name)
  ));

  const callback = function(prev, { born, mother }) {
    const mom = people.find(woman => mother === woman.name);
    const diff = born - mom.born;

    return prev + diff;
  };

  const ages = children.reduce(callback, 0);

  return ages / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
