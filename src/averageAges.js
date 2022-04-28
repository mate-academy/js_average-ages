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
  const men = century
    ? people.filter(x => x.sex === 'm' && Math.ceil(x.died / 100) === century)
    : people.filter(x => x.sex === 'm');

  return men.reduce((sum, x) => sum + (x.died - x.born), 0) / men.length;
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
  const women = withChildren
    ? people.filter(x => x.sex === 'f'
      && people.some(item => item.mother === x.name))
    : people.filter(x => x.sex === 'f');

  return women.reduce((sum, x) => (x.died - x.born) + sum, 0) / women.length;
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
  const childWithMom = people.filter(x => people.some(
    mother => mother.name === x.mother
  ));

  const childWithMomAge = childWithMom.map(x => {
    const mom = people.find(item => item.name === x.mother);

    x.momBorn = mom.born;

    return x;
  });

  const sons = childWithMomAge.filter(x => x.sex === 'm');

  return onlyWithSon
    ? sons.reduce((sum, x) => (x.born - x.momBorn) + sum, 0) / sons.length
    : childWithMomAge.reduce((sum, x) =>
      (x.born - x.momBorn) + sum, 0) / childWithMomAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
