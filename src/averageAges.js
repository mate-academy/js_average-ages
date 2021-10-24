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
  const man = century
    ? people
      .filter(p =>
        p.sex === 'm' && Math.ceil(p.died / 100) === century)
    : people
      .filter(p =>
        p.sex === 'm');

  return man
    .reduce((prev, curr) =>
      prev + curr.died - curr.born, 0)
    / man.length;
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
  const mothers = [...people]
    .filter(p =>
      p.mother !== null)
    .map(p =>
      p.mother);
  const persons = withChildren
    ? people
      .filter(p =>
        mothers
          .includes(p.name))
    : people
      .filter(p =>
        p.sex === 'f');

  return persons
    .reduce((prev, curr) =>
      prev + curr.died - curr.born, 0)
    / persons.length;
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
  const motherNames = [...new Set(
    [...people]
      .filter(p =>
        p.mother !== null && [...people]
          .find(c =>
            c.name === p.mother))
      .map(p =>
        p.mother))];

  const mothers = [...people]
    .filter(p =>
      motherNames
        .find(m =>
          m === p.name))
    .map(m => ({
      'mName': m.name,
      'mBorn': m.born,
    }));

  const childrens = onlyWithSon
    ? [...people]
      .filter(p =>
        p.sex === 'm'
        && motherNames
          .find(m =>
            m === p.mother))
    : [...people]
      .filter(p =>
        motherNames
          .find(m =>
            m === p.mother));

  const all = childrens
    .map(m =>
      m.born - mothers
        .find(el =>
          el.mName === m.mother)
        .mBorn);

  return all
    .reduce((prev, curr) =>
      prev + curr, 0)
    / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
