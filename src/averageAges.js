'use strict';

function calculateMenAverageAge(people, century) {
  let filteredByCentury = people.filter(person =>
    Math.ceil(person.died / 100) === century
  );

  if (century === undefined) {
    filteredByCentury = people;
  }

  const filteredBySex = filteredByCentury.filter(person => person.sex === 'm');

  const sumOfMenAges = filteredBySex.reduce((sum, men) =>
    sum + (men.died - men.born), 0);

  return sumOfMenAges / filteredBySex.length;
}

function calculateWomenAverageAge(people, withChildren) {
  let filterByMotherStatus = people.filter(women =>
    women.sex === 'f'
    && people.some(person => person.mother === women.name)
  );

  if (withChildren === undefined) {
    filterByMotherStatus = people.filter(women => women.sex === 'f');
  }

  const sumOfWomenAges = filterByMotherStatus.reduce((sum, women) =>
    sum + (women.died - women.born), 0);

  return sumOfWomenAges / filterByMotherStatus.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(women =>
    women.sex === 'f'
    && people.some(person => person.mother === women.name)
  );

  let children = people.filter(child =>
    mothers.find(mother => mother.name === child.mother)
  );

  if (onlyWithSon !== undefined) {
    children = people.filter(child =>
      child.sex === 'm'
      && mothers.find(mother => mother.name === child.mother)
    );
  }

  const ageDiff = children.reduce((sum, child) =>
    sum + (child.born - mothers.find(mother =>
      mother.name === child.mother).born), 0
  );

  return ageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
