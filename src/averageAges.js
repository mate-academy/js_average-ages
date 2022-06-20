'use strict';

function Men(people) {
  const menPerson = people.filter(person => person.sex === 'm');

  return menPerson;
}

function Women(people) {
  const womenPerson = people.filter(person => person.sex === 'f');

  return womenPerson;
}

function Mother(people) {
  const mom = people.filter(person =>
    people.some(mother => person.mother === mother.name));

  return mom;
}

function calculateMenAverageAge(people, century) {
  const personCenture = Men(people).filter(person => century
    ? Math.ceil(person.died / 100) === century
    : Men(people));

  const averageAgeMen = personCenture.reduce((sum, year) =>
    sum + (year.died - year.born), 0) / personCenture.length;

  return averageAgeMen;
}
// _____________________________________________________________

function calculateWomenAverageAge(people, withChildren) {
  const personWomen = Women(people).filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : Women(people));

  const averageAgeWomen = personWomen.reduce((sum, year) =>
    sum + (year.died - year.born), 0) / personWomen.length;

  return averageAgeWomen;
}
// ___________________________________________________________

function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = Mother(people).filter(person => onlyWithSon
    ? Mother(people) && person.sex === 'm'
    : Mother(people)
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
