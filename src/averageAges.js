'use strict';

function calculateMenAverageAge(people, century) {
  const men = findPeopleWithSex(people, 'm');

  const withCentury = century > 0
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  return findAverageAge(withCentury);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = findPeopleWithSex(people, 'f');

  const haveChildren = withChildren
    ? women.filter(woman => (
      people.find(person => woman.name === person.mother
      )))
    : women;

  return findAverageAge(haveChildren);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => {
    return people.find(person => person.name === child.mother);
  });

  const isSon = onlyWithSon
    ? findPeopleWithSex(children, 'm')
    : children;

  const sumDifference = isSon.reduce((sum, son) => {
    return sum + son.born
      - people.find(person => person.name === son.mother).born;
  }, 0);

  return sumDifference / isSon.length;
}

function findPeopleWithSex(people, sex) {
  const peopleWithSex = people.filter(person => person.sex === sex);

  return peopleWithSex;
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
