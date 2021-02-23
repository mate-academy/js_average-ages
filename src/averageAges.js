'use strict';

function calculateMenAverageAge(people, century) {
  const wasManBornInCentury = person =>
    person.sex === 'm' && Math.ceil(person.died / 100) === century;

  const isMan = person =>
    person.sex === 'm';

  const men = people.filter(
    century ? wasManBornInCentury : isMan
  );

  return (men
    .reduce((sum, person) =>
      (sum + (person.died - person.born)), 0)) / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const isWomanWithChildren = person =>
    person.sex === 'f' && people.some(child => child.mother === person.name);

  const isWoman = person =>
    person.sex === 'f';

  const women = people.filter(
    withChildren ? isWomanWithChildren : isWoman
  );

  return (women
    .reduce((sum, person) =>
      (sum + (person.died - person.born)), 0)) / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const hasWomanOnlySon = person =>
    people.some(woman => person.mother === woman.name)
    && person.sex === 'm';

  const hasWomanChild = person =>
    people.some(woman => person.mother === woman.name);

  const children = people.filter(
    onlyWithSon ? hasWomanOnlySon : hasWomanChild
  );

  const childBirthAge = children.map(
    child => child.born - people.find(
      mother => mother.name === child.mother).born
  );

  return (childBirthAge
    .reduce((sum, age) => sum + age, 0)) / childBirthAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
