'use strict';

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  const avgOfAge = onlyMen.reduce((sum, obj) =>
    (sum + (obj.died - obj.born)), 0);

  return +(avgOfAge / onlyMen.length).toFixed(2);
}

function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = people.filter(person =>
    withChildren
      ? people.some(({ mother }) => person.name === mother)
      : person.sex === 'f'
  );

  const avgOfAge = onlyWomen.reduce((sum, obj) =>
    (sum + (obj.died - obj.born)), 0);

  return +(avgOfAge / onlyWomen.length).toFixed(2);
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
