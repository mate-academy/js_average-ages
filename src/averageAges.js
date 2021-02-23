'use strict';

function calculateMenAverageAge(people, century) {
  const isMan = (person) => person.sex === 'm';
  const wasManBornInCentury = (person) => person.sex === 'm'
   && Math.ceil(person.died / 100) === century;

  const men = people.filter(century ? wasManBornInCentury : isMan);

  return men.reduce(
    (accumulator, man) => accumulator + man.died - man.born, 0) / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(
    woman => withChildren
      ? people.some(person => person.mother === woman.name)
      : woman.sex === 'f'
  );

  return women.reduce(
    (accumulator, woman) =>
      accumulator + woman.died - woman.born, 0) / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const isMomOfChild = (person) => people.some(
    woman => person.mother === woman.name);
  const isMomOfSon = (person) => people.some(
    woman => person.mother === woman.name && person.sex === 'm'
  );
  const motherFilter = people.filter(
    onlyWithSon ? isMomOfSon : isMomOfChild
  );

  const ageDiffMotherChild = motherFilter.reduce(
    (accumulator, child) => {
      const isMother = people.find(person => person.name === child.mother);
      const ageDiff = child.born - isMother.born;

      return accumulator + ageDiff;
    }, 0) / motherFilter.length;

  return ageDiffMotherChild;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
