'use strict';

const calculateAverageAge = people => {
  const totalAge = people.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );

  return totalAge / people.length;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return calculateAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;

  return calculateAverageAge(womenWithChildren);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(woman =>
    onlyWithSon
      ? people.some(person =>
        person.mother === woman.name && person.sex === 'm')
      : people.some(person => person.mother === woman.name)
  );

  const children = people.filter(person =>
    onlyWithSon
      ? person.sex === 'm'
        && mothers.some(mother => person.mother === mother.name)
      : mothers.some(mother => person.mother === mother.name)
  );

  const ageDiffs = children.map(son => {
    const mother = mothers.find(person => person.name === son.mother);

    return son.born - mother.born;
  });

  const roundedAverageDiff = Number(ageDiffs.reduce(
    (sum, age) => sum + age, 0) / ageDiffs.length.toFixed(2));

  return roundedAverageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
