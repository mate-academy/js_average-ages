'use strict';

function calculateAverage(values) {
  const sum = values.reduce((acc, val) => acc + val, 0);

  return values.length ? sum / values.length : 0;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    person.sex === 'm'
    && (century
      ? Math.ceil(person.died / 100) === century
      : true));

  const menAges = men.map(man => man.died - man.born);

  return calculateAverage(menAges);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    withChildren
      ? people.some(child => child.mother === person.name)
      : person.sex === 'f');

  const womenAges = women.map(woman => woman.died - woman.born);

  return calculateAverage(womenAges);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person =>
    people.some(mother => mother.name === person.mother)
    && (onlyWithSon
      ? person.sex === 'm'
      : true));

  const ageDifferences = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return calculateAverage(ageDifferences);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
