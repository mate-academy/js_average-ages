'use strict';

function calculateMenAverageAge(people, century) {
  const onlyMen = genderFilter(people, 'm');

  const filteredMen = (century)
    ? onlyMen.filter(person => Math.ceil(person.died / 100) === century)
    : onlyMen;

  return calculateAvgAge(filteredMen);
}

function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = genderFilter(people, 'f');

  const filteredWomen = (withChildren)
    ? onlyWomen.filter(woman => people.some(p => p.mother === woman.name))
    : onlyWomen;

  return calculateAvgAge(filteredWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredChildren = people.filter(person => (onlyWithSon)
    ? people.find(mother => mother.name === person.mother
      && person.sex === 'm')
    : people.find(mother => mother.name === person.mother)
  );

  const ageDiff = filteredChildren.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  return ageDiff.reduce((acc, age) => acc + age) / ageDiff.length;
}

function calculateAvgAge(people) {
  return people
    .reduce((acc, person) =>
      acc + (person.died - person.born), 0) / people.length;
}

function genderFilter(people, gender) {
  return people.filter(person => person.sex === gender);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
