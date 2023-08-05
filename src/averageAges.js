'use strict';

function calculateMenAverageAge(people, century) {
  const newPeoples = century ? people.filter(
    person => person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const totalAge = newPeoples.reduce(
    (acc, per) => acc + (per.died - per.born), 0);

  return totalAge / newPeoples.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const woman = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(mother => person.name === mother.mother))
    : people.filter(person => person.sex === 'f');

  const totalAge = woman.reduce(
    (acc, per) => acc + (per.died - per.born), 0);

  return totalAge / woman.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter(person =>
      people.some(child => child.name === person.mother)
    && person.sex === 'm')
    : people.filter(person =>
      people.some(child => child.name === person.mother));

  let motherAge = 0;

  children.forEach(person => {
    const mothers = people.find(mother => mother.name === person.mother);

    if (mothers) {
      const difference = person.born - mothers.born;

      motherAge += difference;
    }
  });

  return motherAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
