'use strict';

function getBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function mama(people) {
  const mom = people.filter(
    person => people.some(
      mother => person.mother === mother.name
    )
  );

  return mom;
}
// _______________________________________________________________

function calculateMenAverageAge(people, century) {
  const men = getBySex(people, 'm');

  const personCenture = men.filter(
    person => century
      ? Math.ceil(person.died / 100) === century
      : men);

  const averageAgeMen = personCenture.reduce(
    (sum, year) => sum + (year.died - year.born),
    0,
  ) / personCenture.length;

  return averageAgeMen;
}
// _____________________________________________________________

function calculateWomenAverageAge(people, withChildren) {
  const women = getBySex(people, 'f');

  const personWomen = women.filter(
    person => withChildren
      ? people.some(child => child.mother === person.name)
      : women);

  const averageAgeWomen = personWomen.reduce(
    (sum, year) => sum + (year.died - year.born),
    0,
  ) / personWomen.length;

  return averageAgeWomen;
}
// ___________________________________________________________

function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = mama(people).filter(person => onlyWithSon
    ? mama(people) && person.sex === 'm'
    : mama(people)
  );

  const AverageAgeDiff = women.reduce(
    (sum, baby) => sum + (baby.born - people.find(
      mother => baby.mother === mother.name).born),
    0,
  ) / women.length;

  return AverageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
