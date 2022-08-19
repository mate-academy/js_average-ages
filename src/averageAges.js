'use strict';

function calculateAverage(value, count) {
  return Math.round(value / count * 100) / 100 || 0;
}

function calculateAverageAge(peopleCategory) {
  const averageYearsValue = peopleCategory
    .map(person => person.died - person.born)
    .reduce((totalYears, age) => totalYears + age, 0);

  return calculateAverage(averageYearsValue, peopleCategory.length);
}

function calculateMenAverageAge(people, century) {
  const mens = people.filter(men => (century
    ? men.sex === 'm' && Math.ceil(men.died / 100) === century
    : men.sex === 'm'));

  return calculateAverageAge(mens);
}

function calculateWomenAverageAge(people, withChildren) {
  const womans = people.filter(person => (withChildren
    ? person.sex === 'f' && people.some(woman => person.name === woman.mother)
    : person.sex === 'f'));

  return calculateAverageAge(womans);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childs = people.filter(child => (onlyWithSon
    ? child.sex === 'm' && people.find(woman => woman.name === child.mother)
    : people.find(woman => woman.name === child.mother)));

  const childsAvgAge = childs
    .reduce((total, child) => (
      total + (child.born - people.find(woman => (
        woman.name === child.mother)
      ).born)
    ), 0);

  return calculateAverage(childsAvgAge, childs.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
