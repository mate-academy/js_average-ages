'use strict';

function calculateMenAverageAge(people, century) {
  const personCenture = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  const averageAgeMen = personCenture.reduce((sum, years) =>
    sum + (years.died - years.born), 0) / personCenture.length;

  return averageAgeMen;
}
// _____________________________________________________________

function calculateWomenAverageAge(people, withChildren) {
  const personWomen = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name) && person.sex === 'f'
    : person.sex === 'f');

  const averageAgeWomen = personWomen.reduce((sum, years) =>
    sum + (years.died - years.born), 0) / personWomen.length;

  return averageAgeWomen;
}
// ___________________________________________________________

function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = people.filter(person => onlyWithSon
    ? people.some(mother => person.mother === mother.name) && person.sex === 'm'
    : people.some(mother => person.mother === mother.name)
  );

  const AverageAgeDiff = women.reduce((sum, baby) =>
    sum + (baby.born - people.find(mother =>
      baby.mother === mother.name).born), 0) / women.length;

  return AverageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
