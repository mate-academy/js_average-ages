'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const arrayMan = people.filter(
    ({ sex, died }) => century
      ? Math.ceil(died / 100) === century && sex === 'm'
      : sex === 'm'
  );

  const summaryAge = arrayMan.reduce(
    (next, { died, born }) => next + (died - born),
    0,
  );

  return summaryAge / arrayMan.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const arrayWomen = withChildren
    ? people.filter(({ name, sex }) => people.some(
      ({ mother }) => name === mother) && sex === 'f')
    : people.filter(({ sex }) => sex === 'f');

  const summaryAge = arrayWomen.reduce(
    (next, { died, born }) => next + (died - born),
    0,
  );

  return summaryAge / arrayWomen.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(
    ({ mother, sex }) => onlyWithSon
      ? people.some(item => mother === item.name)
        && sex === 'm'
      : people.some(item => mother === item.name)
  );

  const averageAgeDiff = children.map(
    ({ born, mother }) => born - people.find(
      ({ name }) => mother === name).born);

  return averageAgeDiff.reduce(
    (next, item) => next + item,
    0,
  ) / averageAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
