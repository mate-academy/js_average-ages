'use strict';

function calculateMenAverageAge(people, century) {
  const filtered = people.filter(century > 0
    ? person => century === Math.ceil(person.died / 100) && person.sex === 'm'
    : person => person.sex === 'm');

  const averageAge = filtered.reduce((prev, person) => {
    const age = person.died - person.born;

    return prev + age;
  }, 0)
  / filtered.length;

  return averageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const filtered = people.filter(withChildren
    ? woman => people.find(person => woman.name === person.mother)
    : person => person.sex === 'f');

  const averageAge = filtered.reduce((prev, person) => {
    const age = person.died - person.born;

    return prev + age;
  }, 0)
  / filtered.length;

  return averageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let count = 0;

  const childs = people.filter(
    onlyWithSon
      ? person => person.mother !== null && person.sex === 'm'
      : person => person.mother !== null);

  const difference = childs.reduce((prev, child) => {
    const mother = people.find(person => person.name === child.mother);

    if (!mother) {
      return prev;
    }

    count++;

    return prev + (child.born - mother.born);
  }, 0);

  return difference / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
