'use strict';

function calculateMenAverageAge(people, century) {
  const age = people
    .filter((person) => century
      ? Math.ceil(person.died / 100) === century : person)
    .filter((person) => person.sex === 'm')
    .map((person) => person.died - person.born);

  return getAvarageAge(age);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) => person.sex === 'f');
  const isWithChidren = women.filter((person) => withChildren
    ? people.find((human) => human.mother === person.name)
    : women);

  const age = isWithChidren.map((person) => person.died - person.born);

  return getAvarageAge(age);
}

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const children = people.filter((child) => people.find(mother => onlyWithSon
    ? mother.name === child.mother && child.sex === 'm'
    : mother.name === child.mother
  ));

  const ageDifference = children.map(function(person) {
    return person.born
    - people.find((human) => human.name === person.mother).born;
  });

  return getAvarageAge(ageDifference);
}

function getAvarageAge(array) {
  return +(array
    .reduce((all, now) => all + now) / array.length)
    .toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
