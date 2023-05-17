'use strict';

function calculateMenAverageAge(people, century) {
  const menDied = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');
  const menAge = menDied.map(person => person.died - person.born);
  const menAverageAge = menAge.reduce((sum, age) => {
    return sum + age;
  }, 0) / menAge.length;

  return menAverageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(person => people.some(child => {
      return person.name === child.mother;
    })
    && person.sex === 'f')
    : people.filter(person => person.sex === 'f');
  const womenAge = women.map(person => person.died - person.born);
  const womenAverageAge = womenAge.reduce((sum, age) => {
    return sum + age;
  }, 0) / womenAge.length;

  return womenAverageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = onlyWithSon
    ? people.filter(person => people.some(child => {
      return child.name === person.mother;
    })
    && person.sex === 'm')
    : people.filter(person => people.some(child => {
      return child.name === person.mother;
    }));
  const ageDiff = mothers.map((child) => {
    const mother = people.find(person => child.mother === person.name);
    const ages = child.born - mother.born;

    return ages;
  });
  const AverageAgeDiff = ageDiff.reduce((sum, age) => {
    return sum + age;
  }, 0) / ageDiff.length;

  return AverageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
