'use strict';

function sumOfFiltredPeople(people) {
  return people.reduce(function(accumulator, currentValue) {
    return accumulator + (currentValue.died - currentValue.born);
  }, 0);
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => (century) ? (
    person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : person.sex === 'm');

  const sum = sumOfFiltredPeople(men);

  return sum / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren ? (
    person.sex === 'f' && people.some(child => child.mother === person.name)
  ) : person.sex === 'f');

  const sum = sumOfFiltredPeople(women);

  return sum / women.length;
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
