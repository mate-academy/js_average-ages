'use strict';

function calculateMenAverageAge(people, century) {
  const average = people
    .filter(person => (century > 0)
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  return +average
    .map(person => person.died - person.born)
    .reduce((accum, value, index, array) => accum + value / array.length, 0)
    .toFixed(2);
}

function calculateWomenAverageAge(people, withChildren) {
  const average = people
    .filter(person => (withChildren)
      ? people.some(child => child.mother === person.name)
      : person.sex === 'f');

  return +average
    .map(person => person.died - person.born)
    .reduce((accum, value, index, array) => accum + value / array.length, 0)
    .toFixed(2);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const average = [];

  const children = people
    .filter(child =>
      people.some(mother => (onlyWithSon)
        ? child.mother === mother.name && child.sex === 'm'
        : child.mother === mother.name));

  people.map(mother => {
    children.map(child => {
      if (mother.name === child.mother) {
        average.push(child.born - mother.born);
      }
    });
  });

  return +average
    .reduce((acc, item, index, array) => acc + item / array.length, 0)
    .toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
