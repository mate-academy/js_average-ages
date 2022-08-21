'use strict';

function averageLifeDuration(peopleArray) {
  return peopleArray.reduce((averageAge, person) =>
    averageAge + (person.died - person.born),
  0,
  ) / peopleArray.length;
}

function calculateMenAverageAge(people, century) {
  const names = [...people].filter((person) => !century
    ? person.sex === 'm'
    : person.sex === 'm' && Math.ceil(person.died / 100) === century);

  return averageLifeDuration(names);
};

function calculateWomenAverageAge(people, withChildren) {
  const motherNames = [...people]
    .filter((person) => person.mother !== null)
    .map((person) => person.mother);

  const names = people.filter((person) => !withChildren
    ? person.sex === 'f'
    : motherNames.includes(person.name)
  );

  return averageLifeDuration(names);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenArray = people.filter((child) => !onlyWithSon
    ? (people.find(mother => child.mother === mother.name))
    : (people.find(mother => child.mother === mother.name
      && child.sex === 'm')));

  return (childrenArray.reduce((difference, child) => {
    return difference + child.born - people.find(mother => (
      child.mother === mother.name)).born;
  }, 0) / childrenArray.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
