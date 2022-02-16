'use strict';

function calculateMenAverageAge(people, century) {
  const manList = people.filter(
    century
      ? person => {
        const centuryValid = Math.ceil(person.died / 100) === century;

        return centuryValid && person.sex === 'm';
      }
      : person => person.sex === 'm');

  return calculateAvaerageAge(manList);
}

function calculateWomenAverageAge(people, withChildren) {
  const womanList = people.filter(
    withChildren
      ? person => {
        const childrenValid = people.find(child =>
          child.mother === person.name);

        return childrenValid && person.sex === 'f';
      }
      : person => person.sex === 'f');

  return calculateAvaerageAge(womanList);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  function motherValid(child) {
    const motherInBase = (people.find(mother =>
      child.mother === mother.name));

    return onlyWithSon
      ? motherInBase && child.sex === 'm'
      : motherInBase;
  }

  const childsWithMother = people.filter(motherValid);
  const sumOfAges = childsWithMother.reduce((sum, person) => {
    const differenceOfAges = person.born - people.find(mother =>
      person.mother === mother.name).born;

    return sum + differenceOfAges;
  }, 0);

  return (sumOfAges / childsWithMother.length);
}

function calculateAvaerageAge(listOfPeople) {
  const averageAge = listOfPeople.reduce((sumOfAges, person) => {
    const personAge = person.died - person.born;

    return sumOfAges + personAge;
  }, 0);

  return (averageAge / listOfPeople.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
