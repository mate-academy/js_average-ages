'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const filteredByCentury = men.filter(person =>
    Math.ceil(person.died / 100) === century);

  const ages = century
    ? filteredByCentury.map(person => person.died - person.born)
    : men.map(person => person.died - person.born);

  const sumOfAges = ages.reduce((a, b) => a + b, 0);

  return sumOfAges / ages.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const filteredByChildren = women.filter(female =>
    people.some(child => child.mother === female.name));

  const ages = withChildren
    ? filteredByChildren.map(person => person.died - person.born)
    : women.map(person => person.died - person.born);

  const sumOfAges = ages.reduce((a, b) => a + b, 0);

  return sumOfAges / ages.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = people.filter(person => person.sex === 'f');
  const filteredByChildren = women.filter(female =>
    people.some(child => child.mother === female.name));

  const children = onlyWithSon
    ? people.filter(person => filteredByChildren.some(mother =>
      mother.name === person.mother && person.sex === 'm'))
    : people.filter(person => filteredByChildren.some(mother =>
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
