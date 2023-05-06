'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const diedMen = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
    && person.sex === 'm')
    : people.filter(person => person.sex === 'm');
  const mensAge = diedMen.map(person => person.died - person.born);
  const sumMensAge = mensAge.reduce((sum, years) => sum + years, 0);
  const averageMensAge = sumMensAge / mensAge.length;

  return averageMensAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenMother = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(kid => person.name === kid.mother))
    : people.filter(person => person.sex === 'f');

  const womensAge = womenMother.map(person => person.died - person.born);
  const sumWomensAge = womensAge.reduce((sum, age) => sum + age, 0);
  const averageWomensAge = sumWomensAge / womensAge.length;

  return averageWomensAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenWithMother = onlyWithSon
    ? people.filter(person => people.some(p => p.name === person.mother)
    && person.sex === 'm')
    : people.filter(person => people.some(p => p.name === person.mother));

  const diffAges = childrenWithMother.map((child) => {
    const mother = people.find(person => child.mother === person.name);
    const diffAge = child.born - mother.born;

    return diffAge;
  });

  const sumDiffAge = diffAges.reduce((sum, age) => sum + age, 0);
  const averageDiffAge = sumDiffAge / childrenWithMother.length;

  return averageDiffAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
