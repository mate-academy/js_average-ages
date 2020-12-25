'use strict';

function calculateMenAverageAge(people, century) {
  return getAverage(
    people
      .filter(person => person.sex === 'm')
      .filter(man => !century || getCentury(man) === century)
      .map(person => person.died - person.born)
  );
}

function getCentury(person) {
  return Math.ceil(person.died / 100);
}

function getAverage(numbers) {
  const sum = numbers.reduce((a, b) => a + b);

  return sum / numbers.length;
};

function calculateWomenAverageAge(people, withChildren) {
  return getAverage(
    people
      .filter(person => person.sex === 'f')
      .filter(woman => !withChildren || getChildren(people, woman).length > 0)
      .map(person => person.died - person.born)
  );
}

function getChildren(people, person) {
  return people
    .filter(child => child.mother === person.name
      || child.father === person.name);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  return getAverage(
    people
      .filter(person => !onlyWithSon || person.sex === 'm')
      .map(child => [child, getMother(people, child)])
      .filter(([, mother]) => mother)
      .map(([child, mother]) => child.born - mother.born)
  );
}

function getMother(people, child) {
  return people.find(mother => mother.name === child.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
