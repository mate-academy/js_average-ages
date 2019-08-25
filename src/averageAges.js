'use strict';

function getAverageAge(peopleList) {
  return (
    peopleList.reduce((sum, person) => sum + (person.died - person.born), 0)
    / peopleList.length
  );
}

function calculateMenAverageAge(people, century) {
  if (century === undefined) {
    const listOfMan = people.filter(person => person.sex === 'm');

    return getAverageAge(listOfMan);
  } else {
    const listOfManInCentury = people.filter(
      person => Math.ceil(person.died / 100) === century && person.sex === 'm'
    );

    return getAverageAge(listOfManInCentury);
  }
}

function calculateWomenAverageAge(people, withChildren) {
  if (withChildren) {
    const listOfMothers = people.map(person => person.mother);
    const listOfWomenWithChild = people.filter(person =>
      listOfMothers.includes(person.name));

    return getAverageAge(listOfWomenWithChild);
  } else {
    const listOfWomen = people.filter(person => person.sex === 'f');

    return getAverageAge(listOfWomen);
  }
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const findMother = (children) => {
    return people.find(person => children.mother === person.name);
  };

  let childrenList = [];

  onlyWithSon === undefined
    ? childrenList = people.filter(person => findMother(person))
    : childrenList = people.filter(child => child.sex === 'm'
      && findMother(child));

  const diffAge = childrenList.reduce((sumOfAge, children) =>
    sumOfAge + (children.born - findMother(children).born), 0);

  return diffAge / childrenList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
