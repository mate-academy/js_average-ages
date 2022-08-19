'use strict';

function calculateMenAverageAge(people, century) {
  const filterPeople = century
    ? people.filter(({ sex, died }) =>
      (sex === 'm' && Math.ceil(died / 100) === century))
    : people.filter(({ sex }) => sex === 'm');

  const calculateMaleAge = filterPeople.reduce((sum, { born, died }) => (
    sum + died - born
  ), 0) / filterPeople.length;

  return calculateMaleAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const filterPeople = withChildren
    ? people.filter(({ name }) => (
      people.find(({ mother }) => name === mother)))
    : people.filter(({ sex }) => sex === 'f');

  const calculateFemaleAge = filterPeople.reduce((sum, { born, died }) => (
    sum + died - born
  ), 0) / filterPeople.length;

  return calculateFemaleAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const findMother = onlyWithSon
    ? people.filter(child =>
      (people.find(mother =>
        child.mother === mother.name) && child.sex === 'm'))
    : people.filter(child =>
      (people.find(mother => child.mother === mother.name)));

  const calculateDifference = findMother.reduce((difference, child) => {
    return difference + child.born - people.find(mother => (
      child.mother === mother.name)).born;
  }, 0) / findMother.length;

  return calculateDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
