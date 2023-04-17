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
  const centuryFilter = century !== undefined
    ? people.filter(p => Math.ceil(p.died / 100) === century) : people;
  const sexFilter = centuryFilter.filter(man => man.sex === 'm');
  const countAges = sexFilter.reduce((sum, man) =>
    sum + (man.died - man.born), 0);

  return countAges / sexFilter.length;
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
  const withChildrenFilter = withChildren !== undefined
    ? people.filter(p => p.sex === 'f'
     && people.some(person => person.mother === p.name))
    : people.filter(p => p.sex === 'f');
  const countAges = withChildrenFilter.reduce((sum, man) =>
    sum + (man.died - man.born), 0);

  return countAges / withChildrenFilter.length;
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
  const sonFilter = onlyWithSon !== undefined
    ? people.filter(p => p.sex === 'm') : people;
  const ages = sonFilter.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return mother !== undefined ? child.born - mother.born : undefined;
  });

  const agesNoUnd = ages.filter((age) => age !== undefined);

  const result = agesNoUnd.reduce((a, b) => a + b, 0) / agesNoUnd.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
