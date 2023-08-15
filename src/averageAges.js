'use strict';

function checkIsMale(person) {
  return person.sex === 'm';
}

function checkIsFemale(person) {
  return person.sex === 'f';
}

function calculateAge(person) {
  return person.died - person.born;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) =>
    checkIsMale(person) && (!century
    || Math.ceil(person.died / 100) === century)
  );

  const totalMenAge = men.reduce((sum, person) =>
    sum + calculateAge(person), 0
  );

  return men.length ? totalMenAge / men.length : 0;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) =>
    checkIsFemale(person) && (!withChildren
    || people.some((child) => child.mother === person.name))
  );

  const totalWomenAge = women.reduce((sum, person) =>
    sum + calculateAge(person), 0
  );

  return women.length ? totalWomenAge / women.length : 0;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const relevantPeople = onlyWithSon
    ? people.filter(person => checkIsMale(person))
    : people;

  const ageDifferences = relevantPeople.map(person => {
    const mother = people.find(candidateMother =>
      candidateMother.name === person.mother
    );

    return mother
      ? person.born - mother.born
      : mother;
  }).filter(ageDiff => ageDiff);

  const totalAgeDifference = ageDifferences
    .reduce((sum, ageDiff) => sum + ageDiff, 0);

  return ageDifferences.length > 0
    ? totalAgeDifference / ageDifferences.length : 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
