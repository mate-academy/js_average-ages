'use strict';

function getAverage(people) {
  return people.reduce((a, b) => a + b) / people.length;
}

function getCentury(person) {
  return Math.ceil(person.died / 100);
}

function getChildren(people, person) {
  return people.filter(child => child.mother === person.name
    || child.father === person.name);
}

function getMother(people, child) {
  return people.find(mother => mother.name === child.mother);
}

function calculateMenAverageAge(people, century) {
  return getAverage(
    people
      .filter(person => person.sex === 'm')
      .filter(man => !century || getCentury(man) === century)
      .map(person => person.died - person.born)
  );
}

function calculateWomenAverageAge(people, withChildren) {
  return getAverage(
    people
      .filter(person => person.sex === 'f')
      .filter(woman => !withChildren || getChildren(people, woman).length > 0)
      .map(person => person.died - person.born)
  );
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  return getAverage(
    people
      .filter(child => !onlyWithSon || child.sex === 'm')
      .map(child => [child, getMother(people, child)])
      .filter(([child, mother]) => mother)
      .map(([child, mother]) => child.born - mother.born)
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
