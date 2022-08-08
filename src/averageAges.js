'use strict';

function calculateMenAverageAge(people, century) {
  const males = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century);

  return males.reduce((total, male) =>
    total + (male.died - male.born), 0) / males.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const females = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person =>
      (people.find(child => person.name === child.mother)));

  return females.reduce((total, female) =>
    total + (female.died - female.born), 0) / females.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = !onlyWithSon
    ? people.filter(child =>
      (people.find(mother => child.mother === mother.name)))
    : people.filter(child =>
      (people.find(mother => child.mother === mother.name)
      && child.sex === 'm'));

  return children.reduce((total, child) => {
    return total + child.born - people.find(mother => (
      child.mother === mother.name)).born;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
