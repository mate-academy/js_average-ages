'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const menInCentury = people.filter(person => person.sex === 'm')
    .filter(person => Math.ceil(person.died / 100) === century);

  const ageAverage = (century === undefined)
    ? men.reduce((sum, person) =>
      sum + (person.died - person.born), 0) / men.length
    : menInCentury.reduce((sum, person) =>
      sum + (person.died - person.born), 0) / menInCentury.length;

  return ageAverage;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const mothers = people.filter(person =>
    people.some(child => child.mother === person.name));

  const ageAverage = (withChildren === undefined)
    ? women.reduce((sum, person) =>
      sum + (person.died - person.born), 0) / women.length
    : mothers.reduce((sum, person) =>
      sum + (person.died - person.born), 0) / mothers.length;

  return ageAverage;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(person =>
    people.some(child => child.mother === person.name));

  const isChild = (child) => mothers
    .some(mother => child.mother === mother.name);

  const isSon = (child) => mothers
    .some(mother => child.mother === mother.name) && child.sex === 'm';

  const children = onlyWithSon ? people.filter(isSon) : people.filter(isChild);

  const averageAgeDiff = children.reduce((sum, child) =>
    sum + (child.born - people
      .find(mother => child.mother === mother.name).born), 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
