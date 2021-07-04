'use strict';

function calculateMenAverageAge(people, century) {
  const male = people.filter(person =>
    century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm'
  );

  return male.map(man => man.died - man.born)
    .reduce((a, b) => a + b) / male.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const female = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.some(kid => kid.mother === person.name)
      : person.sex === 'f'
  );

  return female.map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b) / female.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const kids = people.filter(person =>
    !onlyWithSon
      ? people.find(kid => kid.name === person.mother)
      : people.find(kid => kid.name === person.mother) && person.sex === 'm'
  );

  return kids.map(kid => kid.born - people.find(women =>
    women.name === kid.mother)
    .born)
    .reduce((a, b) => a + b) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
