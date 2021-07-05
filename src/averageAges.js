'use strict';

function calculateMenAverageAge(people, century) {
  const men = (!century)
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);
  const menAges = men.map(person => person.died - person.born);
  const menAverageAge = menAges.reduce((sum, age) => sum + age)
  / menAges.length;

  return menAverageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const haveChildren = people.map(person => person.mother);
  const women = (!withChildren)
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => haveChildren.includes(person.name));
  const womenAges = women.map(person => person.died - person.born);
  const womenAverageAge = womenAges.reduce((accum, age) => accum + age)
  / womenAges.length;

  return womenAverageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = (!onlyWithSon)
    ? people.filter(person => people.some(parent =>
      person.mother === parent.name))
    : people.filter(person => people.some(parent =>
      person.mother === parent.name && person.sex === 'm'));

  const haveChildren = children.map(child => people.find(mother =>
    mother.name === child.mother));
  const differenceAges = children.map((child, i) =>
    child.born - haveChildren[i].born);
  const averageAge = differenceAges.reduce((accum, age) => accum + age)
  / differenceAges.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
