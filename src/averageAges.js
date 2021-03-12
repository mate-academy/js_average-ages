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
function averageAge(age, peopleCount) {
  return age / peopleCount.length;
}

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const ages = men
    .map(person => person.died - person.born)
    .reduce((acc, curr) => acc + curr);

  return averageAge(ages, men);
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women
      .filter(woman => people.some(person => person.mother === woman.name));
  }

  const sumAges = women
    .reduce((sum, woman) => (sum + (woman.died - woman.born)), 0);

  return averageAge(sumAges, women);
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
  const mothers = people
    .filter(person => person.sex === 'f')
    .filter(woman => people.some(person => person.mother === woman.name));

  const children = onlyWithSon
    ? people.filter(person => mothers
      .some(mother => person.mother === mother.name)
    && person.sex === 'm')
    : people.filter(person => mothers
      .some(mother => person.mother === mother.name));

  const ageDifferenceSum = children
    .reduce((acc, child) => {
      const childMother = mothers.find(mother => child.mother === mother.name);
      const ageDifference = child.born - childMother.born;

      return acc + ageDifference;
    }, 0);

  return averageAge(ageDifferenceSum, children);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
