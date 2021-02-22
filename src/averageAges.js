'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(
    person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return men
    .reduce((sum, year) =>
      (sum + (year.died - year.born) / men.length), 0);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(
    person => withChildren
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f'
  );

  return women
    .reduce((sum, year) =>
      (sum + (year.died - year.born) / women.length), 0);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(
    person => onlyWithSon
      ? (people.some(woman => person.mother === woman.name))
      && person.sex === 'm'
      : (people.some(woman => person.mother === woman.name))
  );

  const childBirthAge = children.map(
    child => child.born - people.find(
      mother => mother.name === child.mother).born
  );

  return (childBirthAge
    .reduce((sum, age) => sum + age, 0)) / childBirthAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
