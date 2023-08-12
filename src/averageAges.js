'use strict';

function calculateAverageAge(people) {
  return people.reduce((acc, person) =>
    acc + (person.died - person.born), 0) / people.length;
}

function isParent(people, person) {
  return people.find(mother => mother.name === person.mother);
}

const calculateCentury = person => Math.ceil(person.died / 100);

const isMale = person => person.sex === 'm';
const isFemale = person => person.sex === 'f';

function calculateMenAverageAge(people, century) {
  const menFilteredAges = people
    .filter(person => {
      return century
        ? isMale(person)
          && calculateCentury(person) === century
        : isMale(person);
    });

  return calculateAverageAge(menFilteredAges);
}

function calculateWomenAverageAge(people, withChildren) {
  const womenFilteredAges = people
    .filter(person => withChildren
      ? isFemale(person)
      && people.find(somone => somone.mother === person.name)
      : isFemale(person)
    );

  return calculateAverageAge(womenFilteredAges);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredChildren = people
    .filter(person => onlyWithSon
      ? isParent(people, person)
        && isMale(person)
      : isParent(people, person))
    .map(child => child.born - isParent(people, child).born);

  return filteredChildren.reduce((a, b) => a + b) / filteredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
