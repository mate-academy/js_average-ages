'use strict';

const isMan = (person) => person.sex === 'm';
const calculateAge = (person) => person.died - person.born;
const calculateAvgAge = (dates) => dates.reduce((date1, date2) =>
  date1 + date2) / dates.length;
const isMother = (child, mother) => child.mother === mother.name;

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => isMan(person));
  const menAges = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
      .map(person => calculateAge(person)) : men.map(person => (
      calculateAge(person)));

  return calculateAvgAge(menAges);
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = withChildren
    ? people.filter(person => people.find(child => isMother(child, person)))
    : people.filter(person => person.sex === 'f');

  const womenAges = filteredWomen.map(person => calculateAge(person));
  const averageAges = calculateAvgAge(womenAges);

  return averageAges;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = onlyWithSon
    ? people.filter(person => people.find(child => isMother(child, person)
    && isMan(child)))
    : people.filter(person => people.find(child => isMother(child, person)));

  const children = onlyWithSon
    ? people.filter(person => people.find(mother => isMother(person, mother)
    && isMan(person)))
    : people.filter(person =>
      people.find(mother => isMother(person, mother)));

  const ageDifferences = children.map(child =>
    child.born - mothers.find(mother => isMother(child, mother)).born);
  const averageAges = calculateAvgAge(ageDifferences);

  return averageAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
