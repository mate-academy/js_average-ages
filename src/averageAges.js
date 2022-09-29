'use strict';

function calculateAverageAge(persons) {
  const ages = persons.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );

  return ages / persons.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  return calculateAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) => (
    withChildren
      ? people.find((child) => child.mother === person.name)
      : person.sex === 'f'
  ));

  return calculateAverageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const hasMother = people.filter((child) => !onlyWithSon
    ? child.mother && people.find((person) => person.name === child.mother)
    : child.mother && people.find((person) => person.name === child.mother)
    && child.sex === 'm'
  );

  const ages = hasMother.reduce((sum, person) => {
    const ageDifference = person.born - people.find((mother) => (
      mother.name === person.mother
    )).born;

    return sum + ageDifference;
  }, 0);

  return ages / hasMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
