'use strict';

function calculateMenAverageAge(people, century) {
  return +people
    .filter(person => (century > 0)
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm')
    .map(person => person.died - person.born)
    .reduce((accum, value, index, array) => accum + value / array.length, 0)
    .toFixed(2);
}

function calculateWomenAverageAge(people, withChildren) {
  return +people
    .filter(person => (withChildren)
      ? people.some(child => child.mother === person.name)
      : person.sex === 'f')
    .map(person => person.died - person.born)
    .reduce((accum, value, index, array) => accum + value / array.length, 0)
    .toFixed(2);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people
    .filter(child =>
      people.some(mother => (onlyWithSon)
        ? child.mother === mother.name && child.sex === 'm'
        : child.mother === mother.name));

  return +children
    .map(child => child.born - people
      .find(person => person.name === child.mother).born)
    .reduce((acc, item, index, array) => acc + item / array.length, 0)
    .toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
