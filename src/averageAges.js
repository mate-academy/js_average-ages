'use strict';

function calculateMenAverageAge(people, century) {
  const human = people.filter(person => {
    const age = century ? Math.ceil(person.died / 100) === century : true;

    return person.sex === 'm' && age;
  });
  const fullAge = human.reduce(
    (summ, person) => person.died - person.born + summ, 0);

  return fullAge / human.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => {
    const mothers = people.some(female => female.mother === person.name);

    return person.sex === 'f' && (mothers || !withChildren);
  });

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
