'use strict';

function averageAge(people) {
  return people
    .reduce((sum, person) =>
      sum + (person.died - person.born), 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? (Math.ceil(person.died / 100) === century && person.sex === 'm')
    : person.sex === 'm'
  );

  return averageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    withChildren
      ? person.sex === 'f'
        && people.some(human => human.mother === person.name)
      : person.sex === 'f'
  );

  return averageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenWithChildren = people.filter(onlyWithSon
    ? child => child.mother
        && people.some(person => person.name === child.mother)
        && child.sex === 'm'
    : child => child.mother
        && people.some(person => person.name === child.mother)
  );

  const ageDifference = womenWithChildren
    .reduce((sum, personA) => sum + personA.born - people
      .find(personB => personB.name === personA.mother).born, 0);

  return ageDifference / womenWithChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
