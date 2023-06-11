'use strict';

function calculateMenAverageAge(people, century) {
  const males = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
    && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const sumOfAges = males.reduce((acc, curr) => {
    return (curr.died - curr.born) + acc;
  }, 0);

  return sumOfAges / males.length;
};

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(child => child.mother === person.name)
    : person.sex === 'f'
  );

  const womenAge = women.reduce((acc, curr) => {
    return (curr.died - curr.born) + acc;
  }, 0);

  return womenAge / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    ? people.some(mother => mother.name === child.mother) && child.sex === 'm'
    : people.some(mother => mother.name === child.mother)
  );

  const findAges = children.reduce((acc, child) => {
    const exactMother = people.find(mother => mother.name === child.mother);
    const difference = child.born - exactMother.born;

    return acc + difference;
  }, 0);

  return findAges / children.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
