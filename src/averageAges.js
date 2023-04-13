'use strict';

function averageAges(people) {
  return people.reduce(
    (sum, person) => sum + person.died - person.born, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(
      person => person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return averageAges(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = (withChildren)
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return averageAges(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childs = people.filter(child => child.mother
    && people.some(person => child.mother === person.name));

  const kids = (onlyWithSon)
    ? childs.filter(child => child.sex === 'm')
    : childs;

  const ages = kids.map(kid => {
    const mom = people.find(women => women.name === kid.mother);
    const age = kid.born - mom.born;

    return age;
  });

  return (ages.reduce((sum, age) => sum + age)) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
