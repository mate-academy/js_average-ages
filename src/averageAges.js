'use strict';

const averageAge = people => {
  return people.reduce((acc, person) =>
    acc + (person.died - person.born), 0) / people.length;
};

function calculateMenAverageAge(people, century) {
  const menOfPeople = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return averageAge(menOfPeople);
}

function calculateWomenAverageAge(people, withChildren) {
  const womenOfPeople = people.filter(person =>
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  );

  return averageAge(womenOfPeople);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(mother => mother.sex === 'f');

  const children = people.filter(person =>
    onlyWithSon
      ? people.find(child => child.name === person.mother && person.sex === 'm')
      : people.find(child => child.name === person.mother)
  );

  const ageDifference = children.map(child => {
    const motherOfChild = mothers.find(mother => child.mother === mother.name);

    return child.born - motherOfChild.born;
  });

  const averageMothersAge = ageDifference.reduce((sum, motherAge) =>
    sum + motherAge) / ageDifference.length;

  return averageMothersAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
