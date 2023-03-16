'use strict';

function getAvarageAge(array) {
  const avaragaAge = array.reduce((sum, index) => sum + index) / array.length;

  return avaragaAge;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const menDiedCentury = men.filter(person => (
    Math.ceil(person.died / 100) === century)
  );

  const menAge = (!century)
    ? men.map(person => person.died - person.born)
    : menDiedCentury.map(person => person.died - person.born);

  const avarageMenAge = getAvarageAge(menAge);

  return avarageMenAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = people.filter(woman => (
    people.some(person => person.mother === woman.name))
  );

  const womenAge = (!withChildren)
    ? women.map(person => person.died - person.born)
    : womenWithChildren.map(person => person.died - person.born);

  const avarageWomenAge = getAvarageAge(womenAge);

  return avarageWomenAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => (
    people.some(person => child.mother === person.name))
  );

  const boys = children.filter(person => person.sex === 'm');

  const ageDifference = (!onlyWithSon)
    ? children.map(child => child.born - people.find(mother =>
      child.mother === mother.name).born)
    : boys.map(child => child.born - people.find(mother =>
      child.mother === mother.name).born);

  const avarageAgeDifference = getAvarageAge(ageDifference);

  return avarageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
