'use strict';

function calculateMenAverageAge(allPeople, century) {
  function calculateAverage(people) {
    const totalAge = people.reduce((sum, person) =>
      sum + (person.died - person.born), 0);

    return totalAge / people.length;
  }

  const men = allPeople.filter(person =>
    person.sex === 'm' && (!century || Math.ceil(person.died / 100)
     === century));

  return calculateAverage(men);
}

function calculateWomenAverageAge(allPeople, withChildren) {
  function calculateAverage(people) {
    const totalAge = people.reduce((sum, person) =>
      sum + (person.died - person.born), 0);

    return totalAge / people.length;
  }

  const women = allPeople.filter(person =>
    person.sex === 'f' && (!withChildren || allPeople.some(child =>
      child.mother === person.name)));

  return calculateAverage(women);
}

function calculateAverageAgeDiff(allPeople, onlyWithSon) {
  function findPerson(name) {
    return allPeople.find(person => person.name === name);
  }

  const children = allPeople.filter(person => (!onlyWithSon
     || person.sex === 'm') && findPerson(person.mother));
  const totalAgeDiff = children.reduce((sum, child) => {
    const mother = findPerson(child.mother);

    return sum + (child.born - mother.born);
  }, 0);

  return totalAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
