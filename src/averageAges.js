'use strict';

function calculateAverageAge(averageAge) {
  return (averageAge.reduce((accumulator, currentValue) =>
    (accumulator + (currentValue.died - currentValue.born)), 0))
    / averageAge.length;
}

function calculateMenAverageAge(people, century) {
  const peopleFiltered = people.filter((person) => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  return calculateAverageAge(peopleFiltered);
}

function calculateWomenAverageAge(people, withChildren) {
  const peopleFiltered = people.filter((person) => withChildren
    ? people.some((child) => child.mother === person.name)
    : person.sex === 'f');

  return calculateAverageAge(peopleFiltered);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDifference = [];

  const peopleFiltered = people.filter((person) => onlyWithSon
    ? person.sex === 'm' && people.some(child => child.name === person.mother)
    : people.some(child => child.name === person.mother));

  peopleFiltered.forEach((person) => {
    const foundMother = people.find((mother) =>
      (mother.name === person.mother));

    if (foundMother) {
      ageDifference.push(person.born - foundMother.born);
    }
  });

  return (ageDifference.reduce((accumulator, currentValue) =>
    (accumulator + currentValue), 0))
    / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
