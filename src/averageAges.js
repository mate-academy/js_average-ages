'use strict';

function calculateMenAverageAge(people, century) {
  const filterByMenAndCent = century === undefined
    ? people.filter(e => e.sex === 'm')
    : people
      .filter(e => Math.ceil(e.died / 100) === century && e.sex === 'm');
  const averageAges = countAvgYears(filterByMenAndCent);

  return averageAges;
}

function calculateWomenAverageAge(people, withChildren) {
  const filterByWomen = people.filter(person => person.sex === 'f');

  const filterByWomenAndHasChild = withChildren
    ? filterByWomen
      .filter(
        pers => people.some(person => person.mother === pers.name)
      )
    : filterByWomen;

  let averageAges = countAvgYears(filterByWomenAndHasChild);

  averageAges = +averageAges.toFixed(2);

  return averageAges;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.some(mother => mother.name === person.mother))
    : people.filter(person =>
      people.some(mother => mother.name === person.mother));

  const diffAge = children.map(child =>
    child.born - (people.find(mother => mother.name === child.mother)).born);

  const averageDiffAge = Math.round(diffAge.reduce((sumAge, ageNewMothers) =>
    sumAge + ageNewMothers, 0) * 100 / diffAge.length) / 100;

  return averageDiffAge;
}

function countAvgYears(array) {
  return array.reduce((accum, person) => accum + (person.died - person.born), 0)
  / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
