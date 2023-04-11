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
  const males = people.filter(({ sex }) => sex === 'm');
  const malesInCentury = century
    ? males.filter(({ died }) => Math.ceil(died / 100) === century)
    : males;

  return malesInCentury.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0) / malesInCentury.length;
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
  const females = people.filter(({ sex }) => sex === 'f');
  const femalesWithChildren = withChildren
    ? females.filter(({ name }) => people.some(({ mother }) => mother === name))
    : females;

  return femalesWithChildren.reduce((sum, { born, died }) => {
    return sum + (died - born);
  }, 0) / femalesWithChildren.length;
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
  const children = people.filter(({ mother }) => {
    return people.some(({ name }) => name === mother);
  });
  const childrenSons = onlyWithSon
    ? children.filter(({ sex }) => sex === 'm')
    : children;

  return childrenSons.reduce((sum, { mother, born }) => {
    return sum + born - people.find(({ name }) => name === mother).born;
  }, 0) / childrenSons.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
