'use strict';

const avgOfAge = (array) =>
  array.reduce((acc, el) => acc + (el.died - el.born), 0) / array.length;

function calculateMenAverageAge(people, century) {
  const only = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return avgOfAge(only);
}

function calculateWomenAverageAge(people, withChildren) {
  const only = people.filter(person =>
    withChildren
      ? people.some(({ mother }) => person.name === mother)
      : person.sex === 'f'
  );

  return avgOfAge(only);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => {
    const childWithMother = people.find(mother =>
      mother.name === person.mother);

    return onlyWithSon
      ? childWithMother && person.sex === 'm'
      : childWithMother;
  });

  const calculateAge = children.map(person =>
    (person.born - people.find(mother => mother.name === person.mother).born));

  return calculateAge.reduce((sum, age) =>
    sum + age) / calculateAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
