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
  const mothersWhoHaveSon = people.filter(person => !onlyWithSon
    ? people.find(mother => person.mother === mother.name)
    : people.find(mother => person.mother === mother.name && person.sex === 'm')
  );

  const ageDifference = mothersWhoHaveSon.map((person) =>
    person.born - people.find(mother =>
      person.mother === mother.name).born);

  const sumOfAgeDifference = ageDifference.reduce((acc, currVal) =>
    acc + currVal, 0);

  return sumOfAgeDifference / mothersWhoHaveSon.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
