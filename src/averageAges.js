'use strict';

const averageValue = array => {
  return array.reduce((acc, current) => acc + current) / array.length;
};

const calculateMenAverageAge = (people, century) => {
  const different = people
    .filter(man => man.sex === 'm')
    .filter(man => {
      return century
        ? Math.ceil(man.died / 100) === century
        : man;
    })
    .map(man => man.died - man.born);

  return averageValue(different);
};

const calculateWomenAverageAge = (people, withChildren) => {
  const different = people
    .filter(woman => woman.sex === 'f')
    .filter(woman => {
      return withChildren
        ? people.some(person => person.mother === woman.name)
        : woman;
    })
    .map(woman => woman.died - woman.born);

  return averageValue(different);
};

const calculateAverageAgeDiff = (people, onlyWithSon) => {
  const different = people
    .filter(child => onlyWithSon ? child.sex === 'm' : child)
    .filter(child => people.some(person => child.mother === person.name))
    .map(child => {
      const mother = people.find(person => child.mother === person.name);
      return child.born - mother.born;
    });

  return averageValue(different);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
