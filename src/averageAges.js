'use strict';

function calculateMenAverageAge(people, century) {
  const filterPeople = century
    ? people.filter(({ sex, died }) =>
      (sex === 'm' && Math.ceil(died / 100) === century))
    : people.filter(({ sex }) => sex === 'm');

  const maleAverageAge = filterPeople.reduce((sum, { born, died }) => (
    sum + died - born), 0) / filterPeople.length;

  return maleAverageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const filterPeople = withChildren
    ? people.filter(({ name }) => (
      people.find(({ mother }) => name === mother)))
    : people.filter(({ sex }) => sex === 'f');

  const femaleAverageAge = filterPeople.reduce((sum, { born, died }) => (
    sum + died - born), 0) / filterPeople.length;

  return femaleAverageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const findMother = onlyWithSon
    ? people.filter(child =>
      (people.find(mother => child.mother === mother.name)
      && child.sex === 'm'))
    : people.filter(child =>
      (people.find(mother => child.mother === mother.name)));

  const differenceAge = findMother.reduce((difference, child) => {
    return difference + child.born - people.find(mother => (
      child.mother === mother.name)).born;
  }, 0) / findMother.length;

  return differenceAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
