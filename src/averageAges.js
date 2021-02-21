'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(man => century
    ? man.sex === 'm' && Math.ceil(man.died / 100) === century
    : man.sex === 'm'
  );

  return men.map(man => man.died - man.born)
    .reduce((a, b) => a + b) / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(woman => withChildren
    ? people.some(child => child.mother === woman.name)
    : woman.sex === 'f'
  );

  return women.map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b) / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const averageAgeDiff = people.filter(child => onlyWithSon
    ? people.some(woman => woman.name === child.mother) && child.sex === 'm'
    : people.some(woman => woman.name === child.mother)
  );

  return averageAgeDiff.map(child => child.born - people.find(woman =>
    woman.name === child.mother).born)
    .reduce((a, b) => a + b) / averageAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
