'use strict';

function calculateMenAverageAge(people, century) {
  const result = people.filter(person => !century
    ? person.sex === 'm'
    : Math.ceil(person.died / 100) === century && person.sex === 'm'
  );

  const total = result.reduce((sum, person) =>
    sum + (person.died - person.born),
  0);

  return total / result.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const result = people.filter(mother => !withChildren
    ? mother.sex === 'f'
    : people.some(person => person.mother === mother.name)
  );
  const total = result.reduce((sum, person) =>
    sum + (person.died - person.born),
  0);

  return total / result.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = people.filter(child => (
    child.mother && people.find(woman => woman.name === child.mother)
  ));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  return children.reduce((prev, curr) => (
    prev + curr.born - people.find(woman => (
      woman.name === curr.mother
    )).born), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
