'use strict';

function calculateMenAverageAge(people, century) {
  const isMen = (person) => person.sex === 'm';
  const ismenInCentury = (person) =>
    person.sex === 'm'
    && Math.ceil(person.died / 100) === century;

  const men = people.filter((century === undefined)
    ? isMen : ismenInCentury);

  const ageAverage = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / men.length;

  return ageAverage;
}

function calculateWomenAverageAge(people, withChildren) {
  const isWomen = (person) => person.sex === 'f';
  const isMother = (person) => people.some(
    child => child.mother === person.name);

  const women = people.filter((withChildren)
    ? isMother : isWomen);

  const ageAverage = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / women.length;

  return ageAverage;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(person =>
    people.some(child => child.mother === person.name));

  const isChild = (child) => mothers
    .some(mother => child.mother === mother.name);

  const isSon = (child) => mothers
    .some(mother => child.mother === mother.name) && child.sex === 'm';

  const children = people.filter(onlyWithSon ? isSon : isChild);

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
