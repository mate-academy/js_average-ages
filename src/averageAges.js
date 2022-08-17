'use strict';

function calculateMenAverageAge(people, century) {
  let manArray = [];

  century
    ? manArray = people.filter((man) => man.sex === 'm'
    && Math.ceil(man.died / 100) === century)

    : manArray = people.filter((man) => man.sex === 'm');

  return manArray.reduce(
    (averageAge, person) => averageAge + (person.died - person.born),
    0,
  ) / manArray.length;
}

function calculateWomenAverageAge(people, withChildren) {
  let womenArray = [];
  const motherNames = people.filter((woman) => woman.mother !== null)
    .map((a) => a.mother);

  !withChildren
    ? womenArray = people.filter((woman) => woman.sex === 'f')

    : womenArray = people.filter((woman) => motherNames.includes(woman.name));

  return womenArray.reduce(
    (averageAge, woman) => averageAge + (woman.died - woman.born),
    0,
  ) / womenArray.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = [];

  !onlyWithSon
    ? children = people.filter((child) =>
      (people.find(mother => child.mother === mother.name)))

    : children = people.filter((child) =>
      (people.find(mother =>
        child.mother === mother.name && child.sex === 'm')));

  return (children.reduce((total, child) => {
    return total + child.born - people.find(mother => (
      child.mother === mother.name)).born;
  }, 0) / children.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
