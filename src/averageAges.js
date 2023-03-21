/* eslint-disable max-len */
'use strict';

function calculateMenAverageAge(people, century) {
  const man
    = century
      ? people.filter(person => person.sex === 'm' && Math.ceil(person.died / 100) === century)
      : people.filter(person => person.sex === 'm');

  const ages = man.map(person => person.died - person.born);
  const total = ages.reduce((sum, i) => sum + i, 0);

  return total / ages.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const woman
    = withChildren
      ? people.filter(w => people.some(person => person.mother === w.name))
      : people.filter(person => person.sex === 'f');

  const ages = woman.map(person => person.died - person.born);
  const total = ages.reduce((sum, i) => sum + i, 0);

  return total / ages.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people
    .filter(child =>
      onlyWithSon
        ? child.sex === 'm' && people.some(person => person.name === child.mother)
        : people.some(person => person.name === child.mother));

  const ages = children.map(child =>
    child.born - people.find(person => person.name === child.mother).born);

  const total = ages.reduce((sum, i) => sum + i, 0);

  return total / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
