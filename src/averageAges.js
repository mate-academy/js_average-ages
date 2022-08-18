'use strict';

function calculateMenAverageAge(people, century) {
  const menArray = people.filter((man) => !century
    ? man.sex === 'm'
    : man.sex === 'm' && Math.ceil(man.died / 100) === century);

  return averageLifeDuration(menArray);
}

function calculateWomenAverageAge(people, withChildren) {
  const motherNames = people.filter((woman) => woman.mother !== null)
    .map((a) => a.mother);

  const womenArray = people.filter((woman) => !withChildren
    ? woman.sex === 'f'
    : motherNames.includes(woman.name)
  );

  return averageLifeDuration(womenArray);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenArray = people.filter((child) => !onlyWithSon
    ? (people.find(mother => child.mother === mother.name))
    : (people.find(mother => child.mother === mother.name
      && child.sex === 'm')));

  return (childrenArray.reduce((difference, child) => {
    return difference + child.born - people.find(mother => (
      child.mother === mother.name)).born;
  }, 0) / childrenArray.length);
}

function averageLifeDuration(array) {
  return array.reduce((averageAge, person) =>
    averageAge + (person.died - person.born),
  0,
  ) / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
