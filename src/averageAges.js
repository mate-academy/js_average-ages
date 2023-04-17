'use strict';

function calculateAverageAge(people) {
  const totalAge = people
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  return totalAge / people.length;
}

function calculateMenAverageAge(people, century) {
  const man = people.filter(person => person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century));

  return calculateAverageAge(man);
}

function calculateWomenAverageAge(people, withChildren) {
  const woman = people.filter(person => withChildren
    ? people.find(child => person.name === child.mother)
    : person.sex === 'f');

  return calculateAverageAge(woman);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = people.filter(person => person.sex === 'f');

  const children = people.filter(person =>
    women.some(mother => mother.name === person.mother));

  const filteredChildren = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDifference = filteredChildren.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  const averageAge = ageDifference.reduce((sum, age) =>
    sum + age) / ageDifference.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
