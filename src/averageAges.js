'use strict';

function calculateMenAverageAge(people, century) {
  const filteredBySexMen = people.filter(person => person.sex === 'm');
  const filteredByCentury = filteredBySexMen.filter(person =>
    Math.ceil(person.died / 100) === century);
  let ages;

  century
    ? ages = filteredByCentury.map(person => person.died - person.born)
    : ages = filteredBySexMen.map(person => person.died - person.born);

  const sumOfAges = ages.reduce((a, b) => a + b, 0);

  return sumOfAges / ages.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredBySexWomen = people.filter(person => person.sex === 'f');
  const filteredByChildren = filteredBySexWomen.filter(women =>
    people.some(child => child.mother === women.name));
  let ages;

  withChildren
    ? ages = filteredByChildren.map(person => person.died - person.born)
    : ages = filteredBySexWomen.map(person => person.died - person.born);

  const sumOfAges = ages.reduce((a, b) => a + b, 0);

  return sumOfAges / ages.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let children;
  const filteredBySexWomen = people.filter(person => person.sex === 'f');
  const filteredByChildren = filteredBySexWomen.filter(women =>
    people.some(person => person.mother === women.name));

  onlyWithSon
    ? children = people.filter(person => filteredByChildren.some(mother =>
      mother.name === person.mother && person.sex === 'm'))
    : children = people.filter(person => filteredByChildren.some(mother =>
      mother.name === person.mother));

  const totalAge = children.reduce((sumOfAges, child) => {
    const motherName = child.mother;
    const mothers = people.find((person) =>
      (person.name === motherName));
    const ageDifference = child.born - mothers.born;

    return sumOfAges + ageDifference;
  }, 0);

  return totalAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
