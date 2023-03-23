'use strict';

function calculateMenAverageAge(people, century) {
  const mans = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => (person.sex === 'm'
      && Math.ceil(person.died / 100) === century));

  return mans.reduce((accumulator, value) => {
    const ageDifference = value.died - value.born;

    return accumulator + ageDifference;
  }, 0) / mans.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const womanFiltered = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name));

  return womanFiltered.reduce((accumulator, value) => {
    const ageDifference = value.died - value.born;

    return accumulator + ageDifference;
  }, 0) / womanFiltered.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = !onlyWithSon
    ? people.filter(person => (
      people.some(potentialMother => potentialMother.name === person.mother)
    ))
    : people.filter(person => (
      people.some(potentMom => potentMom.name === person.mother)
      && person.sex === 'm'
    ));

  return children.reduce((accumulator, el) => {
    const mother = people.find(woman => woman.name === el.mother);
    const ageDifference = el.born - mother.born;

    return accumulator + ageDifference;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
