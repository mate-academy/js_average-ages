'use strict';

function sumAges(people) {
  return people.reduce((sum, person) => sum + (person.died - person.born), 0);
}

function isMother(people) {
  return people.filter(women => women.sex === 'f'
    && people.some(person => person.mother === women.name));
}

function isSon(people, mothers) {
  return people.filter(child => child.sex === 'm'
  && mothers.find(mother => mother.name === child.mother));
}

function isChild(people, mothers) {
  return people.filter(child =>
    mothers.find(mother => mother.name === child.mother));
}

function calculateMenAverageAge(people, century) {
  const filteredByCentury = century
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;

  const filteredBySex = filteredByCentury.filter(person => person.sex === 'm');

  return sumAges(filteredBySex) / filteredBySex.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filterByMotherStatus = withChildren
    ? isMother(people)
    : people.filter(women => women.sex === 'f');

  return sumAges(filterByMotherStatus) / filterByMotherStatus.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = isMother(people);

  const children = onlyWithSon
    ? isSon(people, mothers)
    : isChild(people, mothers);

  return children.reduce((sum, child) =>
    sum + (child.born - mothers.find(mother =>
      mother.name === child.mother).born), 0
  ) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
