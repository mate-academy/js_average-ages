'use strict';

function calculateMenAverageAge(people, century) {
  const menAges = people
    .filter(man =>
      (!century || Math.ceil(man.died / 100) === century) && man.sex === 'm'
    )
    .map(man => man.died - man.born);

  return getAverageAge(menAges);
}

function calculateWomenAverageAge(people, withChildren) {
  const womenAge = people
    .filter((woman) => !withChildren
      ? woman.sex === 'f'
      : woman.sex === 'f' && people.some(child => child.mother === woman.name))
    .map((person) => person.died - person.born);

  return getAverageAge(womenAge);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredChildPeople = people.filter(person => {
    const hasMother = people.some(mother => mother.name === person.mother);

    return onlyWithSon ? (person.sex === 'm' && hasMother) : hasMother;
  });

  const diffAge = filteredChildPeople.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  return getAverageAge(diffAge);
}

function getAverageAge(input) {
  return input.reduce((sum, age) => sum + age, 0) / input.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
