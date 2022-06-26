'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? Math.ceil(person.died / 100) === century
    && person.sex === 'm'
    : person.sex === 'm'
  );

  const avarageAge = men.reduce((sum, person) =>
    (sum + (person.died - person.born)), 0)
    / men.length;

  return avarageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? people.some(
      child => child.mother === person.name)
    && person.sex === 'f'
    : person.sex === 'f'
  );

  const avarageAge = women.reduce(
    (sum, age) => sum + (age.died - age.born), 0)
    / women.length;

  return avarageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    ? people.some(person => person.name === child.mother)
    && child.sex === 'm'
    : people.some(person => person.name === child.mother));

  const avarageAgeDiff = children.reduce(
    (sum, child) => sum + (child.born - people.find(
      mom => child.mother === mom.name).born), 0)
    / children.length;

  return avarageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
