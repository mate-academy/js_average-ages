'use strict';

const averageAge = function(people) {
  return people
    .map(person => person.died - person.born)
    .reduce((sumOfAges, age) => sumOfAges + age)
    / people.length;
};

function calculateMenAverageAge(people, century) {
  const whoDied = people.filter(person => (century)
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'
  );

  return averageAge(whoDied);
}

function calculateWomenAverageAge(people, withChildren) {
  const filterWomens = people.filter(person => (withChildren)
    ? people.some(child => child.mother === person.name)
    : person.sex === 'f'
  );

  return averageAge(filterWomens);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const allChildren = people.filter(kid => people
    .some(person => person.name === kid.mother));

  const children = onlyWithSon
    ? allChildren.filter(person => person.sex === 'm')
    : allChildren;

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
