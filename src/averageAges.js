'use strict';

const findAge = person => person.died - person.born;

const findAverage = ages =>
  Math.round(ages.reduce((age1, age2) =>
    age1 + age2) / ages.length * 100) / 100;

const isMale = (person) => person.sex === 'm';

const isFemale = (person) => person.sex === 'f';

const isMother = (child, mother) =>
  child.mother === mother.name;

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    isMale(person));

  const menAges = century
    ? men.filter(person =>
      Math.ceil(person.died / 100) === century).map(findAge)
    : men.map(findAge);

  return findAverage(menAges);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    isFemale(person));

  const womenWithChildren = people.filter(mother =>
    people.find(child =>
      isMother(child, mother)));

  const womenAges = withChildren
    ? womenWithChildren.map(findAge)
    : women.map(findAge);

  return findAverage(womenAges);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenWithChildren = onlyWithSon
    ? people.filter(person =>
      people.find(child =>
        isMother(child, person)
        && isMale(child)))
    : people.filter(person =>
      people.find(child =>
        isMother(child, person)));

  const childrenWithMother = onlyWithSon
    ? people.filter(person =>
      people.find(mother =>
        isMother(person, mother)
        && isMale(person)))
    : people.filter(person =>
      people.find(mother =>
        isMother(person, mother)));

  const matherAgeDifference = childrenWithMother.map(child =>
    child.born - womenWithChildren.find(mother =>
      isMother(child, mother)).born);

  return findAverage(matherAgeDifference);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
