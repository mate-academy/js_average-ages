'use strict';

function calculateMenAverageAge(people, century) {
  const men = (!century)
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  const menAverageAge = men.reduce(
    (sum, person) => sum + (person.died - person.born), 0) / men.length;

  return menAverageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const haveChildren = people.map(person => person.mother);
  const women = (!withChildren)
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => haveChildren.includes(person.name));

  const womenAverageAge = women.reduce(
    (sum, person) => sum + (person.died - person.born), 0) / women.length;

  return womenAverageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = (!onlyWithSon)
    ? people.filter(person => people.some(
      parent => person.mother === parent.name))
    : people.filter(person => people.some(
      parent => person.mother === parent.name && person.sex === 'm'));

  const haveChildren = children.map(child => people.find(
    mother => mother.name === child.mother));
  const averageAge = children.map(
    (child, i) => child.born - haveChildren[i].born)
    .reduce((sum, age) => sum + age) / haveChildren.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
