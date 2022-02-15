'use strict';

function getAge(deathYear, birthYear) {
  return deathYear - birthYear;
}

function calculateMenAverageAge(people, century) {
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(man => Math.ceil(man.died / 100) === century);

    return men.reduce((acc, man) =>
      getAge(man.died, man.born) + acc, 0) / men.length;
  } else {
    return men.reduce((acc, man) =>
      getAge(man.died, man.born) + acc, 0) / men.length;
  }
}

function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(person => person.sex === 'f');
  const children = people.filter(person => person.mother !== null);

  if (withChildren) {
    women = women.filter((woman) =>
      children.find((child) => child.mother === woman.name
      ));

    return women.reduce((acc, woman) =>
      getAge(woman.died, woman.born) + acc, 0) / women.length;
  } else {
    return women.reduce((acc, woman) =>
      getAge(woman.died, woman.born) + acc, 0) / women.length;
  }
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = people.filter(person => person.mother !== null)
    .filter(child => people.find(person => child.mother === person.name));
  const getMother = name =>
    people.find(mother => name === mother.name);

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');

    return children.reduce((acc, child) =>
      acc + child.born - getMother(child.mother).born, 0) / children.length;
  } else {
    return children.reduce((acc, child) =>
      acc + child.born - getMother(child.mother).born, 0) / children.length;
  }
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
