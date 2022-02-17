'use strict';

function calculateMenAverageAge(people, century) {
  const human = people.filter(person =>
    century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : (person.sex === 'm')
  );

  const fullAge = human.reduce(
    (summ, person) => person.died - person.born + summ, 0);

  return fullAge / human.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people
    .filter(person => person.sex === 'f'
    && (withChildren
      ? people.some(female => female.mother === person.name)
      : true));

  const fullAge = women.reduce(
    (summ, person) => person.died - person.born + summ, 0);

  return fullAge / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const child = people.filter(person => {
    const withMother = people.some(mother => person.mother === mother.name);

    return onlyWithSon ? person.sex === 'm' && withMother : withMother;
  });

  const ageDiff = child.map(person => {
    const mother = people.find(woman => woman.name === person.mother);

    return person.born - mother.born;
  });

  const fullAge = ageDiff.reduce((prev, summ) => {
    return prev + (summ / ageDiff.length);
  }, 0);

  return fullAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
