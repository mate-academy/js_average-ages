'use strict';

function calculateMenAverageAge(people, century) {
  const menFromThePeople = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'
  );

  const mensAverageAge = menFromThePeople.reduce(
    (acc, person) =>
      acc + (person.died - person.born), 0) / menFromThePeople.length;

  return mensAverageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const womenFromThePeople = people.filter(person => withChildren
    ? people.some(children => children.mother === person.name)
    : person.sex === 'f'
  );

  const womenAverageAge = womenFromThePeople.reduce((accumulator, person) =>
    accumulator + (person.died - person.born), 0) / womenFromThePeople.length;

  return womenAverageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const ages = [];

  people.map(mother => {
    const listOfChildren = people.filter(child => onlyWithSon
      ? mother.name === child.mother && child.sex === 'm'
      : mother.name === child.mother);

    listOfChildren.map(child => ages.push(child.born - mother.born));
  });

  return ages.reduce((acc, person) => acc + person) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
