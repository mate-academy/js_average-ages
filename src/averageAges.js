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
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return men.reduce((sum, man) => sum + (man.died - man.born), 0) / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const mothers = people
    .filter(person => person.mother !== null)
    .map(person => person.mother);

  const women = withChildren
    ? people.filter(person => person.sex === 'f'
      && mothers.includes(person.name))
    : people.filter(person => person.sex === 'f');

  return women.reduce((sum, fem) => (
    sum + (fem.died - fem.born)
  ), 0) / women.length;
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
  const names = people.map(person => person.name);

  const children = onlyWithSon
    ? people.filter(person => person.mother !== null
      && names.includes(person.mother)
      && person.sex === 'm')
    : people.filter(person => person.mother !== null
      && names.includes(person.mother));

  const mothersNames = children.map(person => person.mother);
  const mothers = people.filter(person => mothersNames.includes(person.name));

  const ageDifferences = children
    .map(child => (child.born - mothers
      .find(person => (person.name === child.mother)
      ).born
    ));

  return ageDifferences
    .reduce((age1, age2) => age1 + age2)
    / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
