'use strict';

function avarageAge(persons) {
  const ages = persons.reduce(
    (sum, person) => (
      sum + (person.died - person.born)
    ), 0
  );

  const averageAge = ages / persons.length;

  return averageAge;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  return avarageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) => (
    withChildren
      ? people.find((child) => child.mother === person.name)
      : person.sex === 'f'
  ));

  return avarageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const hasMother = people.filter((child) => (
    onlyWithSon
      ? child.mother
      && people.find((person) => (
        person.name === child.mother))
        && child.sex === 'm'
      : child.mother && people.find((person) => (
        person.name === child.mother)
      )));

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
