'use strict';

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');
  const totalAge = men.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return totalAge / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(person => people.some(
      child => child.mother === person.name
    ))
    : people.filter(person => person.sex === 'f');
  const totalAge = women.reduce(
    (sum, woman) => sum + (woman.died - woman.born), 0
  );

  return totalAge / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => {
    const mother = people.some(woman => woman.name === person.mother);

    return onlyWithSon ? mother && person.sex === 'm' : mother;
  });

  const differences = children.map(child => {
    const mother = people.find(mom => mom.name === child.mother);

    return child.born - mother.born;
  });

  return differences.reduce((acc, diff) => acc + diff, 0) / differences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
