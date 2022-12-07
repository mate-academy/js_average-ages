'use strict';

function calculateAverageAge(persons) {
  const ages = persons.map(person => person.died - person.born);
  const averageAge = ages.reduce((sum, age) =>
    (sum + age)) / ages.length;

  return averageAge;
}

function calculateMenAverageAge(people, century) {
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(man => (Math.ceil(man.died / 100) === century));
  }

  return calculateAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.map(person => person.mother);
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(woman => mothers.includes(woman.name));
  }

  return calculateAverageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = people.filter(child => {
    return people.some(person => person.name === child.mother);
  });

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  const ageDiff = children.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0);

  return ageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
