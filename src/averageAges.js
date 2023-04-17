'use strict';

function calculateAverageAge(people) {
  return people
    .reduce(
      (accumulator, person) => accumulator + (person.died - person.born), 0
    ) / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const menCentury = century
    ? men.filter(person => Math.ceil(person.died / 100) === century) : men;

  return calculateAverageAge(menCentury);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const womenChildren = withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;

  return calculateAverageAge(womenChildren);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filterSex = people.filter(
    person => onlyWithSon ? person.sex === 'm' : true);
  const children = filterSex.filter(person => people.find(mother =>
    mother.name === person.mother));
  const ages = children.map(person => person.born - people.find(mother =>
    mother.name === person.mother).born);

  return ages.reduce((sum, age) => sum + age) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
