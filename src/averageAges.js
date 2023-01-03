'use strict';

function calculateMenAverageAge(people, century) {
  const man = people.filter(person => (century) ? (
    person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : person.sex === 'm');

  const sum = man.reduce(function(accumulator, currentValue) {
    return accumulator + (currentValue.died - currentValue.born);
  }, 0);

  return sum / man.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const woman = people.filter(person => withChildren ? (
    person.sex === 'f' && people.some(child => child.mother === person.name)
  ) : person.sex === 'f');

  const sum = woman.reduce(function(accumulator, currentValue) {
    return accumulator + (currentValue.died - currentValue.born);
  }, 0);

  return sum / woman.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrens = onlyWithSon
    ? people.filter(child => child.sex === 'm' && people.some(person =>
      child.mother === person.name))
    : people.filter(child => people.some(person =>
      person.name === child.mother));

  const childMother = people.filter(mother => people.some(person =>
    person.mother === mother.name));

  const ages = childrens.map(child =>
    child.born - childMother.find(mother =>
      mother.name === child.mother).born);

  const sum = ages.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);

  return sum / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
