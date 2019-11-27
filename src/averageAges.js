'use strict';

function calculateMenAverageAge(people, century) {
  const ageMan = people.filter(man => man.sex === 'm')
    .filter(man => !century || Math.ceil(man.died / 100) === century)
    .map(man => man.died - man.born);

  return AverageAge(ageMan);
}

function AverageAge(numbers) {
  const age = numbers.reduce((a, b) => a + b);

  return age / numbers.length;
}

function getChild(people, person) {
  return people.filter(child => child.mother === person.name);
}

function calculateWomenAverageAge(people, withChildren) {
  const ageWomen = people.filter(man => man.sex === 'f')
    .filter(women => !withChildren || getChild(people, women).length > 0)
    .map(man => man.died - man.born);

  return AverageAge(ageWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const age = people.filter(person => !onlyWithSon || person.sex === 'm')
    .map(child => [child, getMother(people, child)])
    .filter(([, mother]) => mother)
    .map(([child, mother]) => child.born - mother.born);

  return AverageAge(age);
}

function getMother(people, child) {
  return people.find(mother => mother.name === child.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
