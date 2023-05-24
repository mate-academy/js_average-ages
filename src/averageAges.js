'use strict';

function filterBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function calculateAverage(people) {
  return people.reduce(
    (sum, x) => sum + x.died - x.born, 0) / people.length;
}

function filterHaveMother(people) {
  return people.filter(person => people.some(x => x.name === person.mother));
}

function filterIsMother(people) {
  return people.filter(person => people.some(x => x.mother === person.name));
}

function filterIsPersonsMother(people, x) {
  return people.filter(person => person.mother === x.name);
}

function calculateMenAverageAge(people, century) {
  const menSorted = century
    ? filterBySex(people, 'm').filter(
      person => Math.ceil(person.died / 100) === century)
    : filterBySex(people, 'm');

  return calculateAverage(menSorted);
}

function calculateWomenAverageAge(people, withChildren) {
  const womenSorted = withChildren
    ? filterBySex(filterIsMother(people), 'f')
    : filterBySex(people, 'f');

  return calculateAverage(womenSorted);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const withMotherSorted = (onlyWithSon !== undefined)
    ? filterBySex(filterHaveMother(people), 'm')
    : filterHaveMother(people);
  const mothersSorted = filterIsMother(people);
  const childrenBorn = mothersSorted.reduce(
    (sum, x) => sum + filterIsPersonsMother(withMotherSorted, x).reduce(
      (total, y) => total + y.born, 0), 0);
  const mothersBorn = mothersSorted.reduce(
    (sum, x) => sum + x.born
    * filterIsPersonsMother(withMotherSorted, x).length, 0);
  const ageDiff = childrenBorn - mothersBorn;

  return ageDiff / withMotherSorted.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
