'use strict';

function calculateMenAverageAge(people, century) {
  const totalLengthMan = people.filter(({ sex, died }) =>
    sex === 'm' && (century ? Math.ceil(died / 100) === century : true));

  const totalAgeMan = totalLengthMan.reduce((sum, man) =>
    sum + (man.died - man.born), 0);

  return totalAgeMan / totalLengthMan.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filterWoman = people.filter(({ sex, name }) =>
    sex === 'f' && (withChildren ? people.some(({ mother }) =>
      name === mother) : true));

  const totalAgeWoman = filterWoman.reduce((sum, { born, died }) =>
    sum + (died - born), 0);

  const averageAge = totalAgeWoman / filterWoman.length;

  return Math.round(averageAge * 100) / 100;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filterChildren = people.filter(({ mother, sex }) => {
    const womanHasChildren = people.some(({ name }) => name === mother);

    return womanHasChildren && (onlyWithSon ? sex === 'm' : true);
  });

  const totalDiff = filterChildren.reduce((acc, { born, mother }) => {
    const motherBorn = people.find(({ name }) => name === mother).born;
    const diff = born - motherBorn;

    return acc + diff;
  }, 0);

  const averageAges = totalDiff / filterChildren.length;

  return Math.round(averageAges * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
