'use strict';

const womensFilter = function(people) {
  return people.filter(person => person.sex === 'f');
};

const mensFilter = function(people) {
  return people.filter(person => person.sex === 'm');
};

const averageAge = function(people) {
  return people
    .map(person => person.died - person.born)
    .reduce((sumOfAges, age) => sumOfAges + age)
    / people.length;
};

function calculateMenAverageAge(people, century) {
  const whoDied = people.filter(person =>
    Math.ceil(person.died / 100) === century
  );

  return century
    ? averageAge(mensFilter(whoDied))
    : averageAge(mensFilter(people));
}

function calculateWomenAverageAge(people, withChildren) {
  const hasChildren = people.filter(person =>
    people.some(child => child.mother === person.name));

  return withChildren
    ? averageAge(hasChildren)
    : averageAge(womensFilter(people));
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const allChildren = people.filter(kid => people
    .some(person => person.name === kid.mother));

  const children = onlyWithSon ? mensFilter(allChildren) : allChildren;

  const ages = children.map(kid => {
    const mother = people.find(mom => mom.name === kid.mother);

    return kid.born - mother.born;
  }).reduce((sum, age) => sum + age, 0);

  return ages / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
