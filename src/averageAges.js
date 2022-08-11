'use strict';

function calculateMenAverageAge(people, century) {
  let manArray = [];

  if (century) {
    manArray = people.filter((a) => a.sex === 'm'
    && Math.ceil(a.died / 100) === century);
  } else {
    manArray = people.filter((a) => a.sex === 'm');
  }

  const manAges = manArray.map((b) => b.died - b.born);

  return manAges.reduce((a, b) => (a + b)) / manAges.length;
}

function calculateWomenAverageAge(people, withChildren) {
  let womenArray = [];
  const motherNames = people.filter((a) => a.mother !== null)
    .map((a) => a.mother);

  if (!withChildren) {
    womenArray = people.filter((a) => a.sex === 'f');
  } else {
    womenArray = people.filter((a) => motherNames.includes(a.name));
  }

  const womenAges = womenArray.map((b) => b.died - b.born);

  return womenAges.reduce((a, b) =>
    (a + b)) / womenAges.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = [];

  if (!onlyWithSon) {
    children = people.filter((child) =>
      (people.find(mother => child.mother === mother.name)));
  } else {
    children = people.filter((child) =>
      (people.find(mother =>
        child.mother === mother.name && child.sex === 'm')));
  }

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
