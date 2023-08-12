'use strict';

function calculateAverageAge(people) {
  return people.reduce((acc, { died, born }) =>
    acc + (died - born), 0) / people.length;
}

function isParent(people, person) {
  return people.find(({ name }) => name === person.mother);
}

const calculateCentury = ({ died }) => Math.ceil(died / 100);

const isMale = ({ sex }) => sex === 'm';
const isFemale = ({ sex }) => sex === 'f';

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
      && people.find(({ mother }) => mother === person.name)
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
    .map((child) => child.born - isParent(people, child).born);

  return filteredChildren.reduce((a, b) => a + b) / filteredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
