'use strict';

function filterPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function calculateMenAverageAge(people, century) {
  const onlyMen = filterPeopleBySex(people, 'm');
  const menFiltered = century ? onlyMen.filter(man => Math.ceil(
    man.died / 100) === century) : onlyMen;

  return +(menFiltered.reduce((sum, obj) => sum + (obj.died - obj.born), 0)
  / menFiltered.length).toFixed(2);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = filterPeopleBySex(people, 'f');
  const womenFiltered = withChildren
    ? women.filter(woman => people.some(({ mother }) => woman.name === mother))
    : women;

  return +(womenFiltered.reduce((sum, obj) => sum + (obj.died - obj.born), 0)
    / womenFiltered.length).toFixed(2);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredPeople = onlyWithSon ? people.filter(person =>
    person.sex === 'm') : people;

  const children = filteredPeople.filter(child => people.some(mother =>
    mother.name === child.mother));

  const womenWithChildren = children.map(child =>
    [child, people.find(mother => mother.name === child.mother)]);

  const sum = womenWithChildren.reduce((acc, [child, mother]) =>
    acc + child.born - mother.born, 0);

  return sum / womenWithChildren.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
