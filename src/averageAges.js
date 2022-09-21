'use strict';

function avarageAge(persons) {
  const ages = persons.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );

  const averageAge = ages / persons.length;

  return averageAge;
}

function calculateMenAverageAge(people, century) {
  const men = century !== undefined
    ? people.filter(
      (person) =>
        Math.ceil(person.died / 100) === century && person.sex === 'm'
    )
    : people.filter((person) => person.sex === 'm');

  return avarageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren !== undefined
    ? people.filter((person) =>
      people.some(
        (child) => child.mother === person.name && person.sex === 'f'
      )
    )
    : people.filter((person) => person.sex === 'f');

  return avarageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const hasMother = onlyWithSon !== undefined
    ? people.filter(
      (person) =>
        person.sex === 'm'
        && people.find((mother) => mother.name === person.mother)
    )
    : people.filter((person) =>
      people.find((mother) => mother.name === person.mother)
    );

  const sumOfAges = hasMother.reduce((sum, person) => {
    const ageDiff = person.born - people.find((mother) =>
      mother.name === person.mother).born;

    return sum + ageDiff;
  }, 0);

  return sumOfAges / hasMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
