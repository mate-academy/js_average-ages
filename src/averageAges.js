'use strict';

function calculateMenAverageAge(people, century) {
  const filteredPeople = century
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;

  const men = filteredPeople.filter(person => person.sex === 'm');
  const totalAge = men
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  return men.length > 0 ? totalAge / men.length : 0;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredPeople = withChildren
    ? people.filter(person => {
      return people.some(p => p.mother === person.name);
    })
    : people;

  const women = filteredPeople.filter(person => person.sex === 'f');
  const totalAge = women
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  return women.length > 0 ? totalAge / women.length : 0;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm' && person.mother !== null)
    : people.filter(person => person.mother !== null);

  const ageDiffs = filteredPeople.map(person => {
    const mother = people.find(p => p.name === person.mother);

    if (mother && mother.born) {
      return person.born - mother.born;
    }

    return null;
  });

  const validAgeDiffs = ageDiffs.filter(ageDiff => ageDiff !== null);
  const totalAgeDiff = validAgeDiffs.reduce((sum, ageDiff) => sum + ageDiff, 0);

  return totalAgeDiff / validAgeDiffs.length || 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
