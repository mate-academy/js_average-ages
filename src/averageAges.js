'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(
    man => century
      ? man.sex === 'm' && Math.ceil(man.died / 100) === century
      : man.sex === 'm'
  );

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
  const motherFilter = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  let childrenCounter = 0;

  const ageDiffMotherChild = motherFilter.reduce(
    (accumulator, child) => {
      let ageDiff = 0;
      const isMother = people.find(woman => woman.name === child.mother);

      if (isMother) {
        ageDiff = child.born - isMother.born;
        childrenCounter++;
      }

      return accumulator + ageDiff;
    }, 0) / childrenCounter;

  return ageDiffMotherChild;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
