'use strict';

function calculateMenAverageAge(people, century) {
  const peopleFiltered = people.filter((person) => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  return (peopleFiltered.reduce((accumulator, currentValue) =>
    (accumulator + (currentValue.died - currentValue.born)), 0))
    / peopleFiltered.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const peopleFiltered = people.filter((person) => withChildren
    ? people.some((child) => child.mother === person.name)
    : person.sex === 'f');

  return (peopleFiltered.reduce((accumulator, currentValue) =>
    (accumulator + (currentValue.died - currentValue.born)), 0))
    / peopleFiltered.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDifference = [];

  const peopleFiltered = people.filter((person) => onlyWithSon
    ? person.sex === 'm' && person.mother !== null
    : person.mother !== null);

  const motherFiltered = people.filter((person) =>
    people.some((mother) => mother.mother === person.name));

  peopleFiltered.forEach((person) =>
    motherFiltered.find((mother) => {
      if (mother.name === person.mother) {
        ageDifference.push(person.born - mother.born);
      }
    }));

  return ageDifference.reduce((accumulator, currentValue) =>
    (accumulator + currentValue), 0) / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
