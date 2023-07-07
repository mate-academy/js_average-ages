'use strict';

function calculateMenAverageAge(people, century) {
  return calculateAverageAge(people, (person) =>
    person.sex === 'm' && (century ? Math.ceil(person.died / 100) === century
      : true));
}

function calculateWomenAverageAge(people, withChildren) {
  return calculateAverageAge(people, (person) =>
    person.sex === 'f'
    && (withChildren ? people.find(child => child.mother === person.name)
      : true));
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const motherWithChild = filterPeopleByCriteria(people, (child) => onlyWithSon
    ? people.find(women => child.mother === women.name && child.sex === 'm')
    : people.find(woman => child.mother === woman.name));

  const mothers = motherWithChild.map((child) =>
    people.find((women) => child.mother === women.name)
  );

  return motherWithChild.reduce((sum, child, index) =>
    sum + child.born - mothers[index].born, 0) / motherWithChild.length;
}

function filterPeopleByCriteria(people, criteria) {
  return people.filter((person) => criteria(person));
}

function calculateAverageAge(people, criteria) {
  const filteredAges = filterPeopleByCriteria(people, criteria);

  return filteredAges.reduce((sum, person) =>
    sum + person.died - person.born, 0) / filteredAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
