'use strict';

function calculateMenAverageAge(people, century = 0) {
  const mens = people.filter(
    (person) => person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century)
  );

  return getAverageWithYears(mens);
}

function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(
    ({ name, sex }) => sex === 'f'
      && (!withChildren || people.some((person) => person.mother === name))
  );

  return getAverageWithYears(womens);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const getMother = (motherName) => (
    people.find((person) => person.name === motherName)
  );

  const children = people.filter(({ mother, sex }) => (
    getMother(mother) && (!onlyWithSon || sex === 'm')
  ));

  const differences = children.map((child) => (
    child.born - getMother(child.mother).born
  ));

  return getAverage(differences);
}

const getAverage = (arr) => (
  Math.round((arr.reduce((acc, cur) => (
    acc + cur
  ), 0) / arr.length) * 100) / 100
);

const getAverageWithYears = (arr) => (
  Math.round((arr.reduce((acc, cur) => (
    acc + (cur.died - cur.born)
  ), 0) / arr.length) * 100) / 100
);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
