'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const menAges = (century)
    ? men
      .filter(person => Math.ceil(person.died / 100) === century)
      .map(person => person.died - person.born)
    : men.map((person) => person.died - person.born);

  return (menAges.reduce((sum, age) => sum + age)) / menAges.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = (withChildren)
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');
  const womenAges = women.map(person => person.died - person.born);

  return (womenAges.reduce((sum, age) => sum + age)) / womenAges.length;
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
