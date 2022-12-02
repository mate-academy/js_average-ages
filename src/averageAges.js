'use strict';

function calculateMenAverageAge(people, century) {
  const withCentury = people.filter((person) => {
    if (century > 0) {
      return Math.ceil(person.died / 100) === century && person.sex === 'm';
    } else {
      return person.sex === 'm';
    }
  });

  return findAverageAge(withCentury);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = findPeopleBySex(people, 'f');

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

  const onlySon = onlyWithSon
    ? findPeopleBySex(children, 'm')
    : children;

  const sumDifference = onlySon.reduce((sum, son) => {
    return sum + son.born
      - people.find(person => person.name === son.mother).born;
  }, 0);

  return sumDifference / onlySon.length;
}

function findPeopleBySex(people, sex) {
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
