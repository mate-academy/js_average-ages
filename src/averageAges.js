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
  const men = people.filter(person => person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century));
  const menSpans = men
    .reduce((sum, person) => sum + person.died - person.born, 0);

  return menSpans / men.length;
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
  const women = people.filter(person => person.sex === 'f'
    && (!withChildren || people.find(child => child.mother === person.name)));
  const womenSpans = women
    .reduce((sum, person) => sum + person.died - person.born, 0);

  return womenSpans / women.length;
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
  const childrenWithMothersListed = people
    .filter(child => people.some(mother => mother.name === child.mother)
      && (!onlyWithSon || child.sex === 'm'))
    .map(child => ({
      ...child,
      motherBorn: people.find(mother => child.mother === mother.name).born,
    }));

  const motherChildSpanDiffs = childrenWithMothersListed
    .reduce((sum, child) => sum + child.born - child.motherBorn, 0);

  return motherChildSpanDiffs / childrenWithMothersListed.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
