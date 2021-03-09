
'use strict';

function calculateMenAverageAge(people, century) {
  const allMen = people.filter(
    person => person.sex === 'm'
  );
  const menOfTheCentury = allMen.filter(
    person => Math.ceil(person.died / 100) === century
  );
  const man = century === undefined ? allMen : menOfTheCentury;

  return man.reduce((sum, person) => (
    sum + (person.died - person.born)
  ), 0) / man.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(person => person.sex === 'f');
  const womenWithChildren = womens.filter(
    woman => people.some(person => person.mother === woman.name)
  );
  const women = arguments.length > 1 ? womenWithChildren : womens;

  return women.reduce((sum, person) => (
    sum + (person.died - person.born)
  ), 0) / women.length;
};

function calculateAverageAgeDiff(people, onlyWithSon) {
  const allChildren = people.filter(
    person => people.find(mother => person.mother === mother.name)
  );
  const boys = allChildren.filter(child => child.sex === 'm');
  const children = onlyWithSon ? boys : allChildren;

  return children.reduce((sum, child) => (
    sum + (child.born - people.find(
      mother => child.mother === mother.name
    ).born)), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
