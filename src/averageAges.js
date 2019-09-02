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
  }

  const listOfManInCentury = people.filter(
    person => Math.ceil(person.died / 100) === century && person.sex === 'm'
  );

  return getAverageAge(listOfManInCentury);
}

function calculateWomenAverageAge(people, withChildren) {
  const listOfWomen = people.filter(person => {
    if (!withChildren) {
      return person.sex === 'f';
    }

    return people.some(child => child.mother === person.name);
  });

  return getAverageAge(listOfWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const motherWithChildren = people.filter(person => {
    if (!onlyWithSon) {
      return people.some(mother => mother.name === person.mother);
    }

    return people.some(
      mother => mother.name === person.mother && person.sex === 'm'
    );
  });

  return motherWithChildren.reduce((acc, child, i, arr) => {
    const mother = people.find(person => person.name === child.mother);
    return acc + (child.born - mother.born) / arr.length;
  }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
