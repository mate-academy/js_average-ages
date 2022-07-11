'use strict';

function calculateMenAverageAge(people, century) {
  const men = (century)
    ? people.filter(person => person.sex === 'm'
       && (Math.ceil(person.died / 100) === century))
    : people.filter(person => person.sex === 'm');

  return men.reduce((prev, current) =>
    prev + current.died - current.born, 0) / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = (withChildren)
    ? people.filter(person => person.sex === 'f'
      && people.find(children => children.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return women.reduce((prev, current) =>
    prev + current.died - current.born, 0) / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = (onlyWithSon)
    ? people.filter(person => person.sex === 'm'
       && people.find(mom => person.mother === mom.name))
    : people.filter(person => people.find(mom => person.mother === mom.name));

  return children.reduce((prev, current) =>
    prev + current.born - people.find(person =>
      current.mother === person.name).born, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
