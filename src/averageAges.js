'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );
  const sumAge = men.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );

  return sumAge / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;

  const sumAge = womenWithChildren.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );

  return sumAge / womenWithChildren.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = onlyWithSon
    ? people.filter(woman =>
      people.some(
        person => person.mother === woman.name && person.sex === 'm'))
    : people.filter(woman =>
      people.some(person => person.mother === woman.name));

  const children = onlyWithSon
    ? people.filter(person =>
      person.sex === 'm' && mothers.some(mother =>
        person.mother === mother.name))

    : people.filter(person =>
      mothers.some(mother =>
        person.mother === mother.name));

  const ageDiffs = children.map(son => {
    const mother = mothers.find(person => person.name === son.mother);

    return son.born - mother.born;
  });

  const averageDiff = ageDiffs.reduce(
    (sum, age) => sum + age, 0) / ageDiffs.length;
  const roundedAverageDiff = parseFloat(averageDiff.toFixed(2));

  return roundedAverageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
