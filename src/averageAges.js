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
  const man = people
    .filter(person => person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century))
    .map(person => person.died - person.born);

  return man.reduce((a, b) => a + b, 0) / man.length;
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
  const woman = people
    .map(person => ({
      ...person,
      children: people.find(children => children.mother === person.name),
    }))
    .filter(c => c.sex === 'f' && (!withChildren || !!c.children));

  return woman
    .reduce((acc, curr) => acc + (curr.died - curr.born), 0) / woman.length;
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
  const childrenWithMothers = people
    .map(person => ({
      ...person,
      mother: people.find(pp => pp.name === person.mother),
    }))
    .filter(c => !!c.mother && (!onlyWithSon || c.sex === 'm'));

  return childrenWithMothers
    .reduce((acc, curr) => acc + (curr.born - curr.mother.born),
      0) / childrenWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
