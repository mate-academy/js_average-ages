'use strict';

function calculateMenAverageAge(people, century) {
  const isMan = (person) => person.sex === 'm';
  const isManHasBornInCentury = (person) =>
    person.sex === 'm'
    && Math.ceil(person.died / 100) === century;

  const men = people.filter(century ? isManHasBornInCentury : isMan);

  const average = men.reduce(
    (sum, person) => sum + (person.died - person.born), 0) / men.length;

  return average;
}

function calculateWomenAverageAge(people, withChildren) {
  const isWoman = (person) => person.sex === 'f';
  const isMother = (person) => people.some(
    child => child.mother === person.name);
  const woman = people.filter(withChildren ? isMother : isWoman);

  const average = woman.reduce(
    (sum, person) => sum + (person.died - person.born), 0) / woman.length;

  return average;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(
    person => people.some(
      child => child.mother === person.name)
  );

  const isChild = (child) => mothers.some(
    mother => child.mother === mother.name
  );

  const isSon = (child) => mothers.some(
    mother => child.mother === mother.name) && child.sex === 'm';

  const children = people.filter(onlyWithSon ? isSon : isChild);

  const averageAgeDiff = children.reduce(
    (sum, child) => sum + (child.born - people.find(
      mother => child.mother === mother.name).born)
    , 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
