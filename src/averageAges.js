'use strict';

// Shared Functions

const age = (timePeriod) =>
  timePeriod.map(person =>
    person.died - person.born)
    .reduce((a, b) => a + b, 0)
      / timePeriod.length;

const round = (num) => Math.round(num * 100) / 100;

// Main functions

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const menOfCentury = men.filter(man =>
    (Math.ceil(man.died / 100))
    === century);

  return (century ? round(age(menOfCentury)) : round(age(men)));
};

function calculateWomenAverageAge(people, withChildren) {

  const women = people.filter(person => person.sex === 'f');
  const mothersNames = people.map(person => person.mother);
  const mothers = women.filter(mother =>
    mothersNames.includes(mother.name));

  return (withChildren ? round(age(mothers))
    : round(age(women)));
}

function calculateAverageAgeDiff(people, onlyWithSon) {

  const children = people.filter(person =>
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
       && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  );

  const ageDifferences = children.reduce((ageSum, child) => {
    const motherBorn = people.find(mother => mother.name === child.mother).born;

    return ageSum + (child.born - motherBorn);
  }, 0);

  return ageDifferences / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
