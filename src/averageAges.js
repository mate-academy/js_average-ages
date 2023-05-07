'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function getAverageAge(personsAges) {
  return personsAges.reduce((sum, age) => sum + age, 0) / personsAges.length;
}

function calculateMenAverageAge(people, century) {
  const diedMen = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
    && person.sex === 'm')
    : people.filter(person => person.sex === 'm');
  const mensAge = diedMen.map(person => person.died - person.born);
  const averageAge = getAverageAge(mensAge);

  return averageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const allWomen = withChildren
    ? people.filter((person) => {
      const isWoman = person.sex === 'f';
      const isMom = people.some(kid => person.name === kid.mother);

      return isWoman && isMom;
    })
    : people.filter(person => person.sex === 'f');

  const womensAge = allWomen.map(person => person.died - person.born);

  const averageAge = getAverageAge(womensAge);

  return averageAge;
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

  const averageAge = getAverageAge(diffAges);

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
