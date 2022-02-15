'use strict';

function getAge(deathYear, birthYear) {
  return deathYear - birthYear;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    person.sex === 'm' && (century
      ? Math.ceil(person.died / 100) === century
      : true));

  return men.reduce((acc, man) =>
    getAge(man.died, man.born) + acc, 0) / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    person.sex === 'f' && (withChildren
      ? people.find(child => child.mother === person.name)
      : true));

  return women.reduce((acc, woman) =>
    getAge(woman.died, woman.born) + acc, 0) / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person =>
    people.find(mother => person.mother === mother.name)
    && (onlyWithSon
      ? person.sex === 'm'
      : true));

  const findMother = name =>
    people.find(mother => name === mother.name);

  return children.reduce((acc, child) =>
    acc + child.born - findMother(child.mother).born, 0) / children.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
