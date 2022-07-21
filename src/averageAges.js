'use strict';

const averageAll = (arr) => {
  return arr.reduce((prev, age) => age + prev, 0) / arr.length;
};

function calculateMenAverageAge(people, century) {
  const mens = (century)

    ? people.filter(person => Math.ceil(
      person.died / 100) === century && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const ages = mens.map((person) => person.died - person.born);

  return averageAll(ages);
}

function calculateWomenAverageAge(people, withChildren) {
  const womans = (withChildren)

    ? people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const ages = womans.map(person => person.died - person.born);

  return averageAll(ages);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.some(mother => mother.name === person.mother))
    : people.filter(person => people.some(mother => mother.name
      === person.mother));

  const differenceAges = children.map(child => child.born
    - people.find(mother => mother.name === child.mother).born);

  return averageAll(differenceAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
