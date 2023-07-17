'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const man = (!century)
    ? people
      .filter(person => person.sex === 'm')
    : people
      .filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);
  const menAverageAge = man
    .map(men => (men.died - men.born))
    .reduce((prev, age) => prev + age, 0) / man.length;

  return Math.round(menAverageAge * 100) / 100;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map(person => person.mother);
  const women = (!withChildren)
    ? people
      .filter(person => person.sex === 'f')
    : people
      .filter(person => person.sex === 'f'
      && person.name === mothers.find(mother => mother === person.name));

  const womenAverageAge = women
    .map(woman => woman.died - woman.born)
    .reduce((prev, age) => prev + age, 0) / women.length;

  return Math.round(womenAverageAge * 100) / 100;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = (!onlyWithSon)
    ? people
      .filter(person => people.some(p => p.name === person.mother))
    : people
      .filter(person => people.some(p => p.name === person.mother)
      && person.sex === 'm');

  const averageAgeDiff = children
    .reduce(function(prev, child) {
      const mother = people.find(person => person.name === child.mother);
      const different = child.born - mother.born;

      return prev + different;
    }, 0) / children.length;

  return Math.round(averageAgeDiff * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
