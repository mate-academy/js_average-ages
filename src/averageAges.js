'use strict';

function calculateAverageAge(people) {
  const totalAge = people.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return totalAge / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return calculateAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(person => person.sex === 'f')
      .filter(woman => people.some(person => person.mother === woman.name))
    : people.filter(person => person.sex === 'f');

  return calculateAverageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(mother =>
    !onlyWithSon
      ? people.find(person => person.mother === mother.name)
      : mother.sex === 'f' && people.find(person =>
        person.mother === mother.name)
  );

  const children = people.filter(child =>
    !onlyWithSon
      ? people.find(mother => mother.name === child.mother)
      : child.sex === 'm' && people.find(mother => mother.name === child.mother)
  );

  const ageDiff = children.map(child => {
    const mother = mothers.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  const averageAge = ageDiff.reduce((sum, current) =>
    sum + current, 0) / ageDiff.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
