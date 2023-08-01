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
    ? people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  if (men.length === 0) {
    return 0;
  }

  const sumAge = men.reduce((acc, person) =>
    acc + (person.died - person.born), 0);
  const averageAge = sumAge / men.length;

  return parseFloat(averageAge.toFixed(2));
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
    ? people.filter(person => person.sex === 'f' && people.some(p =>
      p.mother === person.name))
    : people.filter(person => person.sex === 'f');

  if (women.length === 0) {
    return 0;
  }

  const sumAge = women.reduce((acc, person) =>
    acc + (person.died - person.born), 0);
  const averageAge = sumAge / women.length;

  return parseFloat(averageAge.toFixed(2));
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
  const mothers = people.reduce((acc, person) => {
    if (person.mother !== null && !acc.includes(person.mother)) {
      acc.push(person.mother);
    }

    return acc;
  }, []);

  const mothersWithSons = people.filter(person =>
    mothers.includes(person.name));

  const children = onlyWithSon
    ? people.filter(person =>
      person.sex === 'm' && mothers.includes(person.mother))
    : people;

  const ageDifferences = children.map(child => {
    const motherData = mothersWithSons.find(mother =>
      mother.name === child.mother);

    return motherData ? child.born - motherData.born : NaN;
  });

  const validAgeDifferences = ageDifferences.filter(diff => !isNaN(diff));
  const sumAgeDifference = validAgeDifferences.reduce((acc, diff) =>
    acc + diff, 0);

  const averageAgeDifference = sumAgeDifference / validAgeDifferences.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
