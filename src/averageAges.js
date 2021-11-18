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
function calculateMenAverageAge(people, century = 0) {
  const filteredMen = century === 0
    ? people.filter(person =>
      person.sex === 'm')

    : people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century);

  const agesArr = filteredMen.map((man) => man.died - man.born);
  const sumOfAges = agesArr.reduce((sum, n) => sum + n, 0);

  return sumOfAges / agesArr.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWoman = withChildren
    ? people.filter(({ name, sex }) => people.some(
      ({ mother }) => name === mother) && sex === 'f')
    : people.filter(({ sex }) => sex === 'f');

  const sum = filteredWoman.reduce(
    (next, { died, born }) => next + (died - born), 0);

  return sum / filteredWoman.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(({ mother, sex }) => onlyWithSon
    ? people.some(person => mother === person.name)
      && sex === 'm'
    : people.some(person => mother === person.name)
  );

  const ageDiff = children.map(
    ({ born, mother }) => born - people.find(
      ({ name }) => mother === name).born);

  return ageDiff.reduce(
    (next, person) => next + person, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
