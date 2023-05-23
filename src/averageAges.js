'use strict';

function calculateMenAverageAge(people, century) {
  const menSorted = (century !== undefined)
    ? people.filter(
      person => person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return menSorted.reduce(
    (sum, x) => sum + x.died - x.born, 0) / menSorted.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const womenSorted = (withChildren !== undefined)
    ? people.filter(
      person => person.sex === 'f' && people.some(
        x => x.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return womenSorted.reduce(
    (sum, x) => sum + x.died - x.born, 0) / womenSorted.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const withMotherSorted = (onlyWithSon !== undefined)
    ? people.filter(
      person => person.sex === 'm' && people.some(
        x => x.name === person.mother))
    : people.filter(person => people.some(
      x => x.name === person.mother));
  const mothersSorted = people.filter(
    person => withMotherSorted.some(x => x.mother === person.name));
  const ageDiff = mothersSorted.reduce(
    (sum, x) => sum + withMotherSorted.filter(
      person => person.mother === x.name).reduce(
      (total, y) => total + y.born, 0) - x.born * withMotherSorted.filter(
      person => person.mother === x.name).length, 0);

  return ageDiff / withMotherSorted.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
