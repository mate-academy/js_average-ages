'use strict';

function calculateMenAverageAge(people, century) {
  const men = !century
    ? people.filter((person) => person.sex === 'm')
    : people.filter((person) => {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    });

  return men.reduce((sum, person) => (
    sum + (person.died - person.born)), 0) / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = !withChildren
    ? people.filter((woman) => woman.sex === 'f')
    : people.filter(woman => (
      people.find(child => child.mother === woman.name)
    ) && woman.sex === 'f');

  return women.reduce((sum, woman) => (
    sum + (woman.died - woman.born)), 0) / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDiff = !onlyWithSon
    ? people.filter(person => (
      people.find(mom => person.mother === mom.name)))
    : people.filter(person => (
      people.find(mom => person.mother === mom.name)
      && person.sex === 'm'));

  return ageDiff.reduce((sum, per) => (
    sum + per.born - people.find(person => (
      per.mother === person.name)).born), 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
