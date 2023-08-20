'use strict';

const SEX_MALE = 'm';
const SEX_FEMALE = 'f';

function calculateTotalAge(people) {
  return people.reduce((sum, person) => sum + (person.died - person.born), 0);
}

function calculateMenAverageAge(people, century) {
  const filterMen = people.filter(({ sex, died }) =>
    sex === SEX_MALE && (century
      ? Math.ceil(died / 100) === century
      : true
    ));

  const totalAgeMen = calculateTotalAge(filterMen);

  return totalAgeMen / filterMen.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const filterWomans = people.filter(({ sex, name }) =>
    sex === SEX_FEMALE && (withChildren ? people.some(({ mother }) =>
      name === mother) : true));

  const totalAgeWoman = calculateTotalAge(filterWomans);

  const averageAge = totalAgeWoman / filterWomans.length;

  return Math.round(averageAge * 100) / 100;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredChildren = people.filter(({ mother, sex }) => {
    const womanHasChildren = people.some(({ name }) => name === mother);

    return womanHasChildren && (onlyWithSon ? sex === SEX_MALE : true);
  });

  const totalDiff = filteredChildren.reduce((acc, { born, mother }) => {
    const motherBirthYear = people.find(({ name }) => name === mother).born;

    return acc + born - motherBirthYear;
  }, 0);

  const averageAges = totalDiff / filteredChildren.length;

  return Math.round(averageAges * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
