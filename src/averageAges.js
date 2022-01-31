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
  const filterByMen = people.filter(({ sex, died }) => century
    ? sex === 'm' && Math.ceil(died / 100) === century
    : sex === 'm');
  const totalAverageAge = filterByMen.reduce((prev, m) =>
    prev + (m.died - m.born), 0) / filterByMen.length;

  return totalAverageAge;
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
  const filterByMothers = people
    .filter(({ mother }) => mother !== null)
    .map(person => person.mother);

  const filterByWomen = withChildren
    ? people.filter(person => person.sex === 'f'
      && filterByMothers.includes(person.name))
    : people.filter(person => person.sex === 'f');

  const totalAverageAge = filterByWomen.reduce((prev, f) => (
    prev + (f.died - f.born)
  ), 0) / filterByWomen.length;

  return totalAverageAge;
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
  const personNames = people.map(person => person.name);

  const childrenSons = onlyWithSon
    ? people.filter(person => person.mother !== null
      && personNames.includes(person.mother)
      && person.sex === 'm')
    : people.filter(person => person.mother !== null
      && personNames.includes(person.mother));

  const namesOfMothers = childrenSons.map(person => person.mother);
  const mothers = people.filter(person => namesOfMothers.includes(person.name));

  const averageAgeDiff = childrenSons
    .map(child => (child.born - mothers
      .find(person => (person.name === child.mother)
      ).born
    ));

  return averageAgeDiff
    .reduce((totalAge, difference) => totalAge + difference)
    / averageAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
