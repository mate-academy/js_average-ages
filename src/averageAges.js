'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter((
    {
      died,
      sex,
    }) => century ? sex === 'm'
  && Math.ceil(died / 100) === century : sex === 'm');

  return men.reduce((a, b) => a + b.died - b.born, 0) / men.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((
    {
      name,
      sex,
    }) => withChildren ? sex === 'f'
  && people.some(kid => kid.mother === name) : sex === 'f');

  return women.reduce((a, b) => a + b.died - b.born, 0)
    / women.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childWithMother = people.filter((
    {
      sex,
      mother,
    }) => onlyWithSon ? sex === 'm' && mother !== null
    && people.find(parent => parent.name === mother) !== undefined
    : mother !== null
    && people.find(parent => parent.name === mother) !== undefined);

  const result = childWithMother.reduce((a, b) => a
  + b.born
  - people.find(parent => parent.name === b.mother).born, 0)
  / childWithMother.length;

  return +result.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
