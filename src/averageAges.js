'use strict';

const averageValue = (arr) => {
  return arr.reduce((prev, age) => age + prev, 0) / arr.length;
};

function calculateMenAverageAge(people, century) {
  const filterMan = people.filter(person => person.sex === 'm');
  const mens = (century)
    ? people.filter(person => Math.ceil(
      person.died / 100) === century && person.sex === 'm')
    : filterMan;

  const ages = mens.map((person) => person.died - person.born);

  return averageValue(ages);
}

function calculateWomenAverageAge(people, withChildren) {
  const filterWoman = people.filter(person => person.sex === 'f');
  const womans = (withChildren)
    ? people.filter(person => filterWoman
    && people.some(child => child.mother === person.name))
    : filterWoman;

  const ages = womans.map(person => person.died - person.born);

  return averageValue(ages);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.some(mother => mother.name === person.mother))
    : people.filter(person => people.some(mother => mother.name
      === person.mother));

  const differenceAges = children.map(child => child.born
    - people.find(mother => mother.name === child.mother).born);

  return averageValue(differenceAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
