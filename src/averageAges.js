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
  const filtredPeople = century
    ? people.filter(p => Math.ceil(p.died / 100) === century && p.sex === 'm')
    : people.filter(p => p.sex === 'm');

  return +(filtredPeople
    .reduce((p, c) => p + (c.died - c.born), 0) / filtredPeople.length)
    .toFixed(2);
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
  const filtredPeople = withChildren
    ? people.filter(p => people.some(e => e.mother === p.name) && p.sex === 'f')
    : people.filter(p => p.sex === 'f');

  return +(filtredPeople
    .reduce((p, c) => p + (c.died - c.born), 0) / filtredPeople.length)
    .toFixed(2);
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
  const children = people
    .reduce((prev, child) => {
      const mother = onlyWithSon
        ? people.find(m => m.name === child.mother && child.sex === 'm')
        : people.find(m => m.name === child.mother);

      if (mother) {
        prev.ages += child.born - mother.born;
        prev.count += 1;
      }

      return prev;
    }, {
      ages: 0,
      count: 0,
    });

  return +(children.ages / children.count).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
