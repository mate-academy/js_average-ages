'use strict';

function calculateAverageAge(people) {
  return people.reduce((acc, { died, born }) =>
    acc + (died - born), 0) / people.length;
}

function findMother(people, person) {
  return people.find(({ name }) => name === person.mother);
}

const calculateCentury = ({ died }) => Math.ceil(died / 100);

const MALE_SEX = 'm';
const FEMALE_SEX = 'f';

const isMale = ({ sex }) => sex === MALE_SEX;
const isFemale = ({ sex }) => sex === FEMALE_SEX;

function calculateMenAverageAge(people, century) {
  const menFilteredByAges = people
    .filter(person => {
      return century
        ? isMale(person)
          && calculateCentury(person) === century
        : isMale(person);
    });

  return calculateAverageAge(menFilteredByAges);
}

function calculateWomenAverageAge(people, withChildren) {
  const womenFilteredByAges = people
    .filter(person => withChildren
      ? isFemale(person)
      && people.find(({ mother }) => mother === person.name)
      : isFemale(person)
    );

  return calculateAverageAge(womenFilteredByAges);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let filteredChildren = people
    .filter(person => findMother(people, person));

  if (onlyWithSon) {
    filteredChildren = filteredChildren.filter(child => isMale(child));
  }

  filteredChildren = filteredChildren
    .map((child) => child.born - findMother(people, child).born);

  return filteredChildren.reduce((a, b) => a + b) / filteredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
