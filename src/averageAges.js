'use strict';

function calculateMenAverageAge(people, century) {
  const men = filterPeopleBySex(people, 'm');

  const foundMan = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  return calculateAverageAge(foundMan);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = filterPeopleBySex(people, 'f');

  const foundWomen = withChildren
    ? women
      .filter(woman => people
        .find(person => woman.name === person.mother))
    : women;

  return calculateAverageAge(foundWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => people.find(
    person => person.name === child.mother));

  const foundChildren = onlyWithSon
    ? filterPeopleBySex(children, 'm')
    : children;

  const ageDifference = foundChildren.reduce(
    (sum, child) => sum + child.born - people.find(
      person => person.name === child.mother).born, 0)
    / foundChildren.length;

  return ageDifference;
}

const calculateAverageAge = (people) => {
  return people.reduce(
    (sum, person) => ((person.died - person.born) + sum), 0)
    / people.length;
};

const filterPeopleBySex = (people, sex) => {
  return people.filter(person => person.sex === sex);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
