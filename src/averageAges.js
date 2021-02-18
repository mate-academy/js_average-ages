'use strict';

function calculateMenAverageAge(people, century) {
  const person = people.filter(men =>
    century
      ? men.sex === 'm' && Math.ceil(men.died / 100) === century
      : men.sex === 'm'
  );

  return person
    .map(men => men.died - men.born)
    .reduce((a, b) => a + b) / person.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    withChildren
      ? people.some(child => child.mother === person.name && person.sex === 'f')
      : person.sex === 'f'
  );

  return women
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person =>
    onlyWithSon
      ? (people.some(woman => person.mother === woman.name))
      && person.sex === 'm'
      : (people.some(woman => person.mother === woman.name))
  );

  return children
    .map(person =>
      person.born - people.find(woman => woman.name === person.mother).born
    ).reduce((a, b) => a + b) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
