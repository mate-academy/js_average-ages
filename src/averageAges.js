'use strict';

function calculateMenAverageAge(people, century) {
  const filteredBySexMen = people.filter(person => person.sex === 'm');

  if (century) {
    const filteredByCentury = filteredBySexMen.filter(person =>
      Math.ceil(person.died / 100) === century);
    const agesFilteredByCentury = filteredByCentury.map(person =>
      person.died - person.born);
    const sumfilteredByCentury = agesFilteredByCentury.reduce((a, b) => a
    + b, 0);

    return sumfilteredByCentury / agesFilteredByCentury.length;
  }

  const ages = filteredBySexMen.map(person => person.died - person.born);
  const sum = ages.reduce((a, b) => a + b, 0);

  return sum / ages.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredBySexWomen = people.filter(person => person.sex === 'f');

  if (withChildren) {
    const filteredByChildren = filteredBySexWomen.filter(women =>
      people.some(child => child.mother === women.name));
    const agesWomen = filteredByChildren.map(person =>
      person.died - person.born);
    const sumOfages = agesWomen.reduce((a, b) => a + b, 0);

    return sumOfages / agesWomen.length;
  }

  const ages = filteredBySexWomen.map(person => person.died - person.born);
  const sum = ages.reduce((a, b) => a + b, 0);

  return sum / ages.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let children;
  const filteredBySexWomen = people.filter(person => person.sex === 'f');
  const filteredByChildren = filteredBySexWomen.filter(women =>
    people.some(person => person.mother === women.name));

  children = people.filter(person => filteredByChildren.some(mother =>
    mother.name === person.mother));

  if (onlyWithSon) {
    children = people.filter(person => filteredByChildren.some(mother =>
      mother.name === person.mother && person.sex === 'm'));
  }

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
