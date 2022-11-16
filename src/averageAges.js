'use strict';

function calculateMenAverageAge(people, century) {
  const mens = findSex(people, 'm');

  const withCentury = century > 0
    ? mens.filter(men => Math.ceil(men.died / 100) === century)
    : mens;

  return findAverageAge(withCentury);
}

function calculateWomenAverageAge(people, withChildren) {
  const womens = findSex(people, 'f');

  const haveChildren = withChildren
    ? womens.filter(women =>
      people.find(person => women.name === person.mother))
    : womens;

  return findAverageAge(haveChildren);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => {
    return people.find(person => person.name === child.mother);
  });

  const isSon = onlyWithSon
    ? findSex(children, 'm')
    : children;

  const sumDifference = isSon.reduce((sum, son) => {
    return sum + son.born
      - people.find(person => person.name === son.mother).born;
  }, 0);

  return sumDifference / isSon.length;
}

function findSex(people, sex) {
  const peoples = people.filter(person => person.sex === sex);

  return peoples;
}

function findAverageAge(people) {
  const sumAge = people
    .map(person => person.died - person.born)
    .reduce((sum, age) => sum + age);

  return sumAge / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
