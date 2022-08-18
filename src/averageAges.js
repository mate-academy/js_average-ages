'use strict';

function calculateMenAverageAge(people, century) {
  let mens = [];

  century ? (
    mens = people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
  ) : mens = people.filter(person => person.sex === 'm');

  const mensAvgAge = mens
    .map(men => men.died - men.born)
    .reduce((totalYears, menAge) => totalYears + menAge, 0);

  return Math.round(mensAvgAge / mens.length * 100) / 100 || 0;
}

function calculateWomenAverageAge(people, withChildren) {
  let womans = [];

  withChildren ? (
    womans = people
      .filter(person => person.sex === 'f'
    && people.some(woman => person.name === woman.mother))
  ) : (
    womans = people.filter(person => person.sex === 'f')
  );

  const womansAvgAge = womans
    .map(woman => woman.died - woman.born)
    .reduce((totalYears, womanAge) => totalYears + womanAge, 0);

  return Math.round(womansAvgAge / womans.length * 100) / 100 || 0;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let childs = [];

  onlyWithSon ? (
    childs = people
      .filter(child => child.sex === 'm'
        && people.find(woman => woman.name === child.mother))
  ) : (
    childs = people
      .filter(child => people.find(woman =>
        woman.name === child.mother))
  );

  const childsAvgAge = childs
    .reduce((total, child) =>
      total + (child.born - people.find(woman =>
        woman.name === child.mother).born), 0);

  return Math.round(childsAvgAge / childs.length * 100) / 100 || 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
