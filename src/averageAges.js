'use strict';

function calculateMenAverageAge(people, century) {
  const filterByMenAndCent = century === undefined
    ? people.filter(e => e.sex === 'm')
    : people
      .filter(e => Math.ceil(e.died / 100) === century)
      .filter(e => e.sex === 'm');
  const averageAges = filterByMenAndCent
    .map(person => person.died - person.born)
    .reduce((accum, current) => accum + current) / filterByMenAndCent.length;

  return averageAges;
}

function calculateWomenAverageAge(people, withChildren) {
  let filterByWomenAndHasChild = people.filter(person => person.sex === 'f');

  filterByWomenAndHasChild = withChildren === true
    ? filterByWomenAndHasChild
      .filter(
        pers => people.find(person => person.mother === pers.name) !== undefined
      )
    : filterByWomenAndHasChild;

  let averageAges = filterByWomenAndHasChild
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / filterByWomenAndHasChild.length;

  averageAges = +averageAges.toFixed(2);

  return averageAges;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.find(mother => mother.name === person.mother))
    : people.filter(person =>
      people.find(mother => mother.name === person.mother));

  const diffAge = children.map(child =>
    child.born - (people.find(mother => mother.name === child.mother)).born);

  const averageDiffAge = Math.round(diffAge.reduce((sumAge, ageNewMothers) =>
    sumAge + ageNewMothers, 0) * 100 / diffAge.length) / 100;

  return averageDiffAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
