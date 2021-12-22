'use strict';

function getAverageFromArray(array) {
  return array.reduce((prev, person) =>
    person.died - person.born + prev, 0) / array.length;
}

function calculateMenAverageAge(people, century) {
  const centuryStartYear = (century - 1) * 100;
  const centuryEndYear = century * 100 - 1;

  const men = [...people].filter(person => person.sex === 'm');
  const menDiedInCentury
    = [...men].filter(person => person.died >= centuryStartYear
      && person.died <= centuryEndYear);

  return !century ? getAverageFromArray(men)
    : getAverageFromArray(menDiedInCentury);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = [...people].filter(person => person.sex === 'f');
  const mothers = [];

  for (let i = 0; i < people.length; i++) {
    if (people.some(person => person.mother === people[i].name)) {
      mothers.push(people[i]);
    }
  }

  return !withChildren ? getAverageFromArray(women)
    : getAverageFromArray(mothers);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = [...people].filter(person => (
    people.some(mother => person.mother === mother.name)));

  const sons = [...people].filter(person => (people.some(
    mother => person.mother === mother.name && person.sex === 'm')));

  const motherAges = children.map(person => person.born - people.find(
    mother => person.mother === mother.name).born);

  const motherWithSonsAges = sons.map(person => person.born
    - people.find(mother => person.mother === mother.name).born);

  return !onlyWithSon ? motherAges.reduce(
    (prev, current) => prev + current, 0) / motherAges.length
    : motherWithSonsAges.reduce(
      (prev, current) => prev + current, 0) / motherWithSonsAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
