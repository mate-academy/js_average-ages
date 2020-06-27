'use strict';

function calculateMenAverageAge(people, century) {
  const man = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');
  const difference = man.map(years => years.died - years.born);
  const age = +(difference.reduce((suma, x) => (suma + x))
   / difference.length).toFixed(2);

  return age;
}

function calculateWomenAverageAge(people, withChildren) {
  const woman = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(child => child.mother === person.name)
    : person.sex === 'f');
  const difference = woman.map(years => years.died - years.born);
  const age = +(difference.reduce((suma, x) => (suma + x))
     / difference.length).toFixed(2);

  return age;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const woman = people.filter(person =>
    people.some(mother => person.name === mother.mother));
  const children = people.filter(person => onlyWithSon
    ? people.some(child => person.mother === child.name) && person.sex === 'm'
    : people.some(child => person.mother === child.name));
  const ages = children.map(person =>
    person.born - woman.find(age => age.name === person.mother).born);

  return +(ages.reduce((suma, x) => (suma + x)) / ages.length).toFixed(2);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
