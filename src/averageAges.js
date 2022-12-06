'use strict';

// first

function calculateMenAverageAge(people, century) {
  let filterMen = people.filter(person => person.sex === 'm');

  if (century) {
    filterMen = filterMen.filter(
      person => (Math.ceil(person.died / 100) === century)
    );
  }

  const sumAges = filterMen.map(person => person.died - person.born);

  const avgAge = sumAges.reduce((a, b) =>
    a + b, 0) / sumAges.length;

  return avgAge;
}

// second

function calculateWomenAverageAge(people, withChildren) {
  let filterWomen = people.filter(person => person.sex === 'f');
  const childCheck = people.map(person => person.mother);

  if (withChildren) {
    filterWomen = filterWomen.filter(
      person => childCheck.includes(person.name)
    );
  }

  const sumAges = filterWomen.map(person => person.died - person.born);

  const avgAge = sumAges.reduce((a, b) =>
    a + b, 0) / sumAges.length;

  return avgAge;
}

// third

function calculateAverageAgeDiff(people, onlyWithSon) {
  let filterChildren = people.filter(person => people.find(mother =>
    mother.name === person.mother));

  if (onlyWithSon) {
    filterChildren = filterChildren.filter(person => person.sex === 'm');
  }

  const ageDiffs = filterChildren.map(child =>
    child.born - people.find(person => person.name === child.mother).born);

  const sumAges = ageDiffs.reduce((a, b) => a + b, 0);

  const avgAgeDiff = sumAges / ageDiffs.length;

  return avgAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
