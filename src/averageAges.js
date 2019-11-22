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
  const men = arguments.length > 1
    ? people
      .filter(person => Math.ceil(person.died / 100) === century
        && person.sex === 'm')
    : people
      .filter(person => person.sex === 'm');

  return men
    .reduce((sum, person) => sum + (person.died - person.born), 0)
      / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = arguments.length > 1
    ? people
      .filter(person => person.sex === 'f'
        && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return women
    .reduce((sum, person) => sum + (person.died - person.born), 0)
      / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const mothers = people
    .filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name));

  const children = people
    .filter(child => (
      mothers.some(mother => mother.name === child.mother)
    ));

  let childrenWithMothers = children.map(child => {
    const motherOfChild = mothers
      .find(mother => mother.name === child.mother);

    return [child, motherOfChild];
  });

  onlyWithSon && (childrenWithMothers = childrenWithMothers
    .filter(pair => (pair[0].sex === 'm'))
  );

  return childrenWithMothers.reduce((sum, childWithMother) =>
    (sum + (childWithMother[0].born - childWithMother[1].born)), 0)
      / childrenWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
