'use strict';

function calculateMenAverageAge(people, century) {
  const man = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  return getAverages(getAges(man));
};

function calculateWomenAverageAge(people, withChildren) {
  const woman = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(child => child.mother === person.name)
    : person.sex === 'f');

  return getAverages(getAges(woman));
};

function calculateAverageAgeDiff(people, onlyWithSon) {
  const woman = people.filter(person =>
    people.some(mother => person.name === mother.mother));
  const children = people.filter(person => onlyWithSon
    ? people.some(child => person.mother === child.name) && person.sex === 'm'
    : people.some(child => person.mother === child.name));
  const ages = children.map(person =>
    person.born - woman.find(age => age.name === person.mother).born);

  return getAverages(ages);
};

function getAges(people) {
  return people.map(person => person.died - person.born);
}

function getAverages(ages) {
  return +(ages.reduce((suma, x) => (suma + x))
  / ages.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
